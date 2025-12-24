import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { RecruitmentFormData } from "@/lib/models/recruitment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      regno,
      vitEmail,
      preference1,
      preference2,
      personalQuestions,
      githubRepo,
      linkedinProfile,
      whyJoin,
      submittedAt,
    } = body ?? {};

    // Validation
    if (!name || !regno || !vitEmail) {
      return NextResponse.json(
        { error: "Missing required fields: name, regno, or vitEmail" },
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
    const validatePreference = (pref: any, prefNum: string) => {
      if (!pref.dept || !pref.projects) {
        return `${prefNum}: Department and projects are required`;
      }
      if (
        !pref.technicalQuestions?.q1 ||
        !pref.technicalQuestions?.q2
      ) {
        return `${prefNum}: All technical questions are required`;
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

    if (!githubRepo || !linkedinProfile || !whyJoin) {
      return NextResponse.json(
        { error: "GitHub repo, LinkedIn profile, and whyJoin are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("awsclublaunch");
    const coll = db.collection("recruitments");

    // Normalize email and regno for case-insensitive matching
    const normalizedEmail = vitEmail.toLowerCase().trim();
    const normalizedRegno = regno.trim();

    // Check if a document with the same email AND regno exists
    const existing = await coll.findOne({
      $and: [
        { vitEmail: { $regex: `^${normalizedEmail}$`, $options: "i" } },
        { regno: normalizedRegno },
      ],
    });

    // Prepare the document to insert
    const recruitmentData: RecruitmentFormData = {
      name: name.trim(),
      regno: normalizedRegno,
      vitEmail: normalizedEmail,
      preference1: {
        dept: preference1.dept,
        projects: preference1.projects.trim(),
        technicalQuestions: {
          q1: preference1.technicalQuestions.q1.trim(),
          q2: preference1.technicalQuestions.q2.trim(),
        },
      },
      preference2: {
        dept: preference2.dept,
        projects: preference2.projects.trim(),
        technicalQuestions: {
          q1: preference2.technicalQuestions.q1.trim(),
          q2: preference2.technicalQuestions.q2.trim(),
        },
      },
      personalQuestions: {
        q1: personalQuestions.q1.trim(),
        q2: personalQuestions.q2.trim(),
      },
      githubRepo: githubRepo.trim(),
      linkedinProfile: linkedinProfile.trim(),
      whyJoin: whyJoin.trim(),
      submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
    };

    if (existing) {
      // Delete the existing document
      await coll.deleteOne({
        $and: [
          { vitEmail: { $regex: `^${normalizedEmail}$`, $options: "i" } },
          { regno: normalizedRegno },
        ],
      });
    }

    // Insert the new document
    await coll.insertOne(recruitmentData);

    return NextResponse.json({
      status: existing ? "updated" : "created",
      message: existing
        ? "Your previous submission has been replaced with this new one."
        : "Application submitted successfully.",
    });
  } catch (err) {
    console.error("Recruitment API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

