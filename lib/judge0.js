import axios from "axios";

export function getJudge0LanguageId(language) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    GO: 60,
  };
  return languageMap[language.toUpperCase()];
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Submit batch of submissions to Judge0
// export async function submitBatch(submissions) {
//   const { data } = await axios.post(
//     `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
//     { submissions },
//     {
//       headers: {
//         "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
//         "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
//       },
//     },
//   );
//   console.log("Batch submission response:", data);
//   return data;
// }
export async function submitBatch(submissions) {
  try {
    console.log("📡 Submitting to Judge0...");
    console.log("🔑 API Key:", process.env.RAPIDAPI_KEY?.slice(0, 10) + "...");
    console.log("🌐 Host:", process.env.RAPIDAPI_HOST);
    console.log("🔗 URL:", process.env.JUDGE0_API_URL);

    const response = await fetch(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissions }),
      },
    );

    console.log("📊 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Judge0 error response:", errorText);
      throw new Error(`Judge0 API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ submitBatch failed:", error.message);
    throw error;
  }
}

export async function pollBatchResults(tokens) {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      },
    );

    console.log(data);
    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2,
    );
    if (isAllDone) return results;

    await sleep(1000);
  }
}
