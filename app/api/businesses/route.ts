import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Types } from "mongoose";

// GET all businesses
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");

    const businesses = await db.collection("businesses").find({}).toArray();

    // Transform the data to ensure consistent format
    const transformedBusinesses = businesses.map((business) => ({
      _id: business._id.toString(),
      name: business.name || "",
      image: business.image || "",
      description: business.description || "",
      link: business.link || "",
      socials: business.socials || {
        instagram: "",
        facebook: "",
        twitter: "",
        website: "",
      },
    }));

    return NextResponse.json(transformedBusinesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}

// POST new business
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const data = await request.json();

    const result = await db.collection("businesses").insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const insertedBusiness = await db
      .collection("businesses")
      .findOne({ _id: result.insertedId });

    return NextResponse.json(insertedBusiness, { status: 201 });
  } catch (error) {
    console.error("Error creating business:", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}

// PUT update business
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const data = await request.json();
    const { id, ...updateData } = data;

    const result = await db.collection("businesses").findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
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
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 }
    );
  }
}

// DELETE business
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Business ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db.collection("businesses").deleteOne({
      _id: new Types.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting business:", error);
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
