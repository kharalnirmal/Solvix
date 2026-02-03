import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { UserRole } from "@/src/generated/enums";

export async function POST(request) {
  try {
    console.log("🚀 Starting problem creation...");

    const userRole = await currentUserRole();
    const user = await getCurrentUser();

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("📥 Received:", {
      title: body.title,
      languages: Object.keys(body.referenceSolutions || {}),
    });

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one test case is required" },
        { status: 400 },
      );
    }

    if (!referenceSolutions || typeof referenceSolutions !== "object") {
      return NextResponse.json(
        {
          error:
            "Reference solutions must be provided for all supported languages",
        },
        { status: 400 },
      );
    }

    console.log("✅ Basic validation passed");

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      console.log(`\n🔍 Validating ${language}...`);

      const languageId = getJudge0LanguageId(language);
      console.log(`📌 Judge0 Language ID: ${languageId}`);

      if (!languageId) {
        return NextResponse.json(
          { error: `Unsupported language: ${language}` },
          { status: 400 },
        );
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      console.log(`📊 Submitting ${submissions.length} test cases...`);
      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);

      console.log(`⏳ Polling Judge0 for results...`);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        // Better logging
        console.log(`\n📝 Test Case ${i + 1} Results:`);
        console.log("Input:", submissions[i].stdin);
        console.log("Expected Output:", submissions[i].expected_output);
        console.log("Actual Output:", result.stdout);
        console.log("Status:", result.status?.description);
        console.log("Status ID:", result.status?.id);
        console.log("Stderr:", result.stderr);
        console.log("Compile Output:", result.compile_output);
        console.log("Time:", result.time);
        console.log("Memory:", result.memory);

        if (result.status?.id !== 3) {
          console.error(`❌ Test case ${i + 1} failed for ${language}`);

          return NextResponse.json(
            {
              error: `Test case ${i + 1} failed for ${language}`,
              testCase: {
                index: i + 1,
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                stderr: result.stderr,
                compileError: result.compile_output,
                statusDescription: result.status?.description,
              },
            },
            { status: 400 },
          );
        }
      }
    }

    console.log("💾 Saving to database...");
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
        userId: user.id,
      },
    });

    console.log(`✅ Problem saved with ID: ${newProblem.id}`);
    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        data: newProblem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    return NextResponse.json(
      { error: "Failed to save problem to database", details: error.message },
      { status: 500 },
    );
  }
}
