import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

const MAX_LAUNCH_PASSES = 200;
// hello
//test2
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("awsclublaunch");
    const coll = db.collection("invitations");
    const totalUsers = await coll.countDocuments();

    return NextResponse.json({
      status: totalUsers >= MAX_LAUNCH_PASSES ? "closed" : "open",
      total: totalUsers,
      limit: MAX_LAUNCH_PASSES,
    });
  } catch (err) {
    console.error("invite GET API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body ?? {};

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("awsclublaunch"); // default DB from connection string
    const coll = db.collection("invitations");

    // find case-insensitive
    const existing = await coll.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (existing) {
      return NextResponse.json(
        {
          status: "exists",
          message: "Email already registered",
          name: existing.name
        },
        { status: 200 }
      );
    }

    const totalUsers = await coll.countDocuments();
    if (totalUsers >= MAX_LAUNCH_PASSES) {
      return NextResponse.json(
        {
          error:
            "Launch passes are limited to 2. Registrations are closed now.",
        },
        { status: 403 }
      );
    }

    const doc = {
      name,
      email,
      createdAt: new Date(),
    };

    const result = await coll.insertOne(doc);

    return NextResponse.json(
      { status: "created", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("invite API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
