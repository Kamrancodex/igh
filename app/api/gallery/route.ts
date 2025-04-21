import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

interface GalleryImage {
  _id?: ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt?: Date;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const images = await db
      .collection<GalleryImage>("gallery")
      .find()
      .limit(8)
      .toArray();

    const transformedImages = images.map((img) => ({
      _id: img._id?.toString() || "",
      title: img.title || "",
      description: img.description || "",
      imageUrl: img.imageUrl || "",
      category: img.category || "all",
      createdAt: img.createdAt || new Date(),
    }));

    return NextResponse.json(transformedImages);
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { category = "all", page = 1 } = await request.json();
    const limit = 8;
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<GalleryImage>("gallery");

    // Build query based on category
    const query = category === "all" ? {} : { category };

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    // Fetch images with pagination
    const images = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    const transformedImages = images.map((img) => ({
      _id: img._id?.toString() || "",
      title: img.title || "",
      description: img.description || "",
      imageUrl: img.imageUrl || "",
      category: img.category || "all",
      createdAt: img.createdAt || new Date(),
    }));

    return NextResponse.json({
      images: transformedImages,
      total,
      hasMore: total > skip + limit,
    });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
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
    const { id, ...updateData } = body as {
      id: string;
    } & Partial<GalleryImage>;

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db
      .collection<GalleryImage>("gallery")
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
      .collection<GalleryImage>("gallery")
      .deleteOne({ _id: new ObjectId(id) });

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
