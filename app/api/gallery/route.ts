import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Types } from "mongoose";

interface GalleryItem {
  _id?: Types.ObjectId;
  title: string;
  image: string;
  description: string;
  category: string;
  size?: "small" | "medium" | "large";
  position?:
    | "top-left"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-right";
  createdAt?: Date;
}

const ITEMS_PER_PAGE = 5;

export const dynamic = "force-dynamic";

// GET handler for fetching gallery images
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const collection = db.collection<GalleryItem>("gallery");

    const images = await collection.find().toArray();

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

// POST handler for creating new gallery items
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("hospitality");
    const collection = db.collection<GalleryItem>("gallery");

    // If category and page are provided, treat it as a fetch request
    if ("category" in body && "page" in body) {
      const { category = "all", page = 1 } = body as {
        category: string;
        page: number;
      };
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
    }

    // Otherwise, treat it as a create request
    const newItem = body as Omit<GalleryItem, "_id">;
    const result = await collection.insertOne({
      ...newItem,
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      throw new Error("Failed to create gallery item");
    }

    return NextResponse.json({
      message: "Gallery item created successfully",
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error with gallery operation:", error);
    return NextResponse.json(
      { error: "Failed to process gallery operation" },
      { status: 500 }
    );
  }
}

// PUT handler for updating gallery items
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body as { id: string } & Partial<GalleryItem>;

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db
      .collection<GalleryItem>("gallery")
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: updateData });

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
    let id: string;

    // Try to get ID from query parameters first
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("id");

    if (queryId) {
      id = queryId;
    } else {
      // If not in query params, try to get from request body
      try {
        const body = await request.json();
        id = body.id;
      } catch (e) {
        // If both fail, return error
        return NextResponse.json(
          { error: "Gallery item ID is required" },
          { status: 400 }
        );
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: "Gallery item ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db
      .collection<GalleryItem>("gallery")
      .deleteOne({ _id: new Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
