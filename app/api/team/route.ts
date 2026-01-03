import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface Socials {
  twitter: string;
  facebook: string;
  linkedin: string;
  behance: string;
}

interface TeamMember {
  _id?: ObjectId;
  name: string;
  title: string;
  image: string;
  socials: Socials;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET all team members
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");

    const teamMembers = await db
      .collection<TeamMember>("team_members")
      .find()
      .sort({ createdAt: 1 })
      .toArray();

    const transformedMembers = teamMembers.map((member) => ({
      _id: member._id?.toString() || "",
      name: member.name || "",
      title: member.title || "",
      image: member.image || "",
      description: member.description || "",
      socials: member.socials || {
        twitter: "",
        facebook: "",
        linkedin: "",
        behance: "",
      },
    }));

    return NextResponse.json(transformedMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST new team member
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const data = (await request.json()) as Omit<TeamMember, "_id">;

    const result = await db.collection<TeamMember>("team_members").insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const insertedMember = await db
      .collection<TeamMember>("team_members")
      .findOne({ _id: result.insertedId });

    return NextResponse.json(insertedMember, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

// PUT update team member
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const data = await request.json();
    const { id, ...updateData } = data as { id: string } & Partial<TeamMember>;

    const result = await db.collection<TeamMember>("team_members").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE team member
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Team member ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db.collection<TeamMember>("team_members").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
