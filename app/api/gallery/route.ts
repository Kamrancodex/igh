import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { InsertOneResult } from "mongodb";

export const dynamic = "force-dynamic";

interface GalleryImage {
  _id?: ObjectId;
  title: string;
  description: string;
  image: string;
  category: string;
  size: string;
  position: string;
  createdAt?: Date;
}

// GET handler for fetching images with pagination and filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = 8;
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("hospitality");
    const collection = db.collection<GalleryImage>("gallery");

    // Build query based on category
    const query = category ? { category } : {};

    try {
      // Get total count for pagination
      const total = await collection.countDocuments(query);

      // Fetch images with pagination
      const images = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      console.log("Found images:", images);

      // Transform the images to match the frontend interface
      const transformedImages = images.map((img) => {
        const transformed = {
          _id: img._id?.toString() || "",
          title: img.title || "",
          description: img.description || "",
          image: img.image || "",
          imageUrl: img.image || "",
          category: img.category || "",
          size: img.size || "medium",
          position: img.position || "top-left",
          createdAt: img.createdAt || new Date(),
        };
        return transformed;
      });

      const response = {
        images: transformedImages || [],
        total: total || 0,
        hasMore: total > skip + limit,
        page,
      };

      console.log("Sending response:", response);
      return NextResponse.json(response);
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return NextResponse.json(
        {
          images: [],
          total: 0,
          hasMore: false,
          error: "Failed to fetch images from database",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to process gallery request:", error);
    return NextResponse.json(
      {
        images: [],
        total: 0,
        hasMore: false,
        error: "Failed to process request",
      },
      { status: 500 }
    );
  }
}

// POST handler for creating new gallery items
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.image || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem: GalleryImage = {
      title: body.title,
      description: body.description,
      image: body.image,
      category: body.category,
      size: body.size || "medium",
      position: body.position || "top-left",
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("hospitality");
    const collection = db.collection<GalleryImage>("gallery");

    try {
      const result = (await collection.insertOne(
        newItem
      )) as InsertOneResult<GalleryImage>;
      if (!result.acknowledged) {
        throw new Error("Insert operation was not acknowledged");
      }

      return NextResponse.json({
        _id: result.insertedId.toString(),
        ...newItem,
      });
    } catch (error) {
      console.error("Error inserting gallery item:", error);
      return NextResponse.json(
        { error: "Failed to insert gallery item" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db.collection("gallery").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: updateData.title,
          image: updateData.image,
          description: updateData.description,
          category: updateData.category,
          size: updateData.size || "medium",
          position: updateData.position || "top-left",
        },
      },
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: result.value._id.toString(),
      ...updateData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Try to get ID from both URL params and request body
    const { searchParams } = new URL(request.url);
    const urlId = searchParams.get("id");

    // Also try to get ID from request body
    const body = await request.json().catch(() => ({}));
    const bodyId = body.id;

    // Use either URL param or body ID
    const id = urlId || bodyId;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery item ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db.collection("gallery").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
