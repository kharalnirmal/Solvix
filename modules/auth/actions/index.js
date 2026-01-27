"use server";
import { db } from "@/lib/db";
//prisma client instance -> used to talk you database
import { currentUser } from "@clerk/nextjs/server"; //to access sessions
//clerk helper-> gives he currently logged-in user

// ===============================
// USER ONBOARDING ACTION
// ===============================
export const onBoardUser = async () => {
  try {
    //ask clerk? "who is currently logged in?"
    const user = await currentUser();

    //if no user is logged in, stop here
    //currentUser() returns null if session doesn't exit
    if (!user) {
      return { success: false, error: "No aut" };
    }

    //destructuring useful fields from clerk's user object

    const {
      id, //clerks unique user id (eg: user_abc123)
      firstName,
      lastName,
      imageUrl,
      emailAddresses, //array because clerk supports multiple emails
    } = user;

    /**
     * UPSERT = UPDATE or INSERT
     * --------------------------------
     * If a user with this clerkId already exists → UPDATE
     * If not → CREATE a new user
     *
     * This prevents duplicate users on every login
     */

    const newUser = await db.user.upsert({
      // Prisma will search using this condition
      where: {
        clerkId: id, // clerkId is stored in our DB and marked as @unique
      },
      update: {
        firstName: firstName || null,
        // Use null if Clerk doesn't have this value

        lastName: lastName || null,

        imageUrl: imageUrl || null,

        // emailAddresses is an array
        // [0] = primary email
        // ?. = optional chaining (prevents crashes)
        // || "" ensures Prisma gets a string
        email: emailAddresses[0]?.emailAddress || "",
      },

      // If user does NOT exist → create a new record
      create: {
        clerkId: id, // Link Prisma user to Clerk user

        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0]?.emailAddress || "",
      },
    });
    // Return the Prisma user (NOT Clerk user)
    return {
      success: true,
      user: newUser,
      message: "User onboarded successfully",
    };
  } catch (error) {
    console.error("❌ Error onboarding user:", error);

    return {
      success: false,
      error: "Failed to onboard user",
    };
  }
};
