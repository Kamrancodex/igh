import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const ITEMS_PER_PAGE = 5;

export const dynamic = "force-dynamic";

// GET handler for static builds
export async function GET() {
  return NextResponse.json({ message: "Gallery API endpoint" });
}

// POST handler for fetching gallery images
export async function POST(request: Request) {
  try {
    const { category = "all", page = 1 } = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection("gallery");

    const query = category === "all" ? {} : { category };
    const limit = 8;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      collection.find(query).skip(skip).limit(limit).toArray(),
      collection.countDocuments(query),
    ]);

    return NextResponse.json({
      images,
      hasMore: total > skip + limit,
      total,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

// PUT handler for updating gallery items
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const { db } = await connectToDatabase();

    const result = await db
      .collection("gallery")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Gallery item updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE handler for removing gallery items
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const { db } = await connectToDatabase();

    const result = await db.collection("gallery").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
