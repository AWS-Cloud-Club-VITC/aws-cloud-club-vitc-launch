import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { RecruitmentFormData } from "@/lib/models/recruitment";
import { deptConfig } from "@/lib/config/departments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      regno,
      phoneNumber,
      vitEmail,
      preference1,
      preference2,
      personalQuestions,
      linkedinProfile,
      whyJoin,
      submittedAt,
    } = body ?? {};

    // Validation
    if (!name || !regno || !phoneNumber || !vitEmail) {
      return NextResponse.json(
        { error: "Missing required fields: name, regno, phoneNumber, or vitEmail" },
        { status: 400 }
      );
    }

    // Validate VIT email format
    if (!/^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/.test(vitEmail)) {
      return NextResponse.json(
        { error: "Invalid VIT email format. Must end with @vitstudent.ac.in" },
        { status: 400 }
      );
    }

    // Validate preferences
    if (!preference1 || !preference2) {
      return NextResponse.json(
        { error: "Both preferences are required" },
        { status: 400 }
      );
    }

    // Validate preference structure
    // Validate preference structure
    const validatePreference = (pref: any, prefNum: string) => {
      if (!pref.dept) {
        return `${prefNum}: Department is required`;
      }
      
      const config = deptConfig[pref.dept];
      if (!config) {
          return `${prefNum}: Invalid department selected`;
      }

      // Check Questions
      if (!pref.answers) return `${prefNum}: Answers are missing`;
      
      for (let i = 0; i < config.questions.length; i++) {
        const answer = pref.answers[`q${i}`];
        if (!answer || !answer.trim()) {
             const qShort = config.questions[i].length > 30 ? config.questions[i].substring(0, 30) + "..." : config.questions[i];
             return `${prefNum}: Answer required for "${qShort}"`;
        }
      }

      // Check Projects
      if (config.project?.required && !pref.projects?.trim()) {
        return `${prefNum}: ${config.project.label} is required`;
      }
      if (config.projectLink?.required && !pref.projectLink?.trim()) {
        return `${prefNum}: ${config.projectLink.label} is required`;
      }
      if (config.github?.required && !pref.githubProfile?.trim()) {
        return `${prefNum}: GitHub Profile is required`;
      }
      
      return null;
    };

    const pref1Error = validatePreference(preference1, "Preference 1");
    if (pref1Error) {
      return NextResponse.json({ error: pref1Error }, { status: 400 });
    }

    const pref2Error = validatePreference(preference2, "Preference 2");
    if (pref2Error) {
      return NextResponse.json({ error: pref2Error }, { status: 400 });
    }

    // Check if both preferences have the same department
    if (preference1.dept && preference2.dept && preference1.dept === preference2.dept) {
      return NextResponse.json(
        { error: "Preference 1 and Preference 2 cannot have the same department" },
        { status: 400 }
      );
    }

    // Validate personal questions
    if (
      !personalQuestions?.q1 ||
      !personalQuestions?.q2
    ) {
      return NextResponse.json(
        { error: "All personal questions are required" },
        { status: 400 }
      );
    }

    if (!linkedinProfile || !whyJoin) {
      return NextResponse.json(
        { error: "LinkedIn profile and whyJoin are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("awsclublaunch");
    const coll = db.collection("recruitments");

    // Normalize email and regno for case-insensitive matching
    const normalizedEmail = vitEmail.toLowerCase().trim();
    const normalizedRegno = regno.trim();

    // Prepare the document to insert
    const recruitmentData: RecruitmentFormData = {
      name: name.trim(),
      regno: normalizedRegno,
      phoneNumber: phoneNumber.trim(),
      vitEmail: normalizedEmail,
      preference1: {
        dept: preference1.dept,
        ...(deptConfig[preference1.dept]?.project ? { projects: preference1.projects?.trim() } : {}),
        ...(deptConfig[preference1.dept]?.projectLink ? { projectLink: preference1.projectLink?.trim() } : {}),
        ...(deptConfig[preference1.dept]?.github ? { githubProfile: preference1.githubProfile?.trim() } : {}),
        answers: preference1.answers,
      },
      preference2: {
        dept: preference2.dept,
        ...(deptConfig[preference2.dept]?.project ? { projects: preference2.projects?.trim() } : {}),
        ...(deptConfig[preference2.dept]?.projectLink ? { projectLink: preference2.projectLink?.trim() } : {}),
        ...(deptConfig[preference2.dept]?.github ? { githubProfile: preference2.githubProfile?.trim() } : {}),
        answers: preference2.answers,
      },
      personalQuestions: {
        q1: personalQuestions.q1.trim(),
        q2: personalQuestions.q2.trim(),
      },
      linkedinProfile: linkedinProfile.trim(),
      whyJoin: whyJoin.trim(),
      submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
    };

    // Check if email exists and update OR insert new
    const result = await coll.updateOne(
        { vitEmail: { $regex: `^${normalizedEmail}$`, $options: "i" } },
        { $set: recruitmentData },
        { upsert: true }
    );

    return NextResponse.json({
      status: result.upsertedCount > 0 ? "created" : "updated",
      message: result.upsertedCount > 0 
        ? "Application submitted successfully." 
        : "Your previous application has been updated with this new submission.",
    });
  } catch (err) {
    console.error("Recruitment API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

