import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const ITEMS_PER_PAGE = 5;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category") || "all";
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const client = await clientPromise;
    const db = client.db("hospitality");

    // Build query based on category
    const query = category !== "all" ? { category } : {};

    // Get unique categories
    const categories = await db.collection("gallery").distinct("category");

    const [images, total] = await Promise.all([
      db
        .collection("gallery")
        .find(query)
        .skip(skip)
        .limit(ITEMS_PER_PAGE)
        .toArray(),
      db.collection("gallery").countDocuments(query),
    ]);

    // Transform the data to match our interface
    const transformedImages = images.map((image) => ({
      _id: image._id.toString(),
      title: image.title || "",
      image: image.image || "",
      description: image.description || "",
      category: image.category || "uncategorized",
      size: image.size || "medium",
      position: image.position || "top-left",
    }));

    return NextResponse.json({
      images: transformedImages,
      hasMore: skip + images.length < total,
      total,
      categories: categories.filter(Boolean), // Remove any null/empty categories
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log("gallery hit");

  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("hospitality");

    const result = await db.collection("gallery").insertOne({
      title: body.title,
      image: body.image,
      description: body.description,
      category: body.category,
      size: body.size || "medium",
      position: body.position || "top-left",
    });

    return NextResponse.json({
      _id: result.insertedId.toString(),
      ...body,
    });
  } catch (error) {
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

    if (!result.value) {
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
