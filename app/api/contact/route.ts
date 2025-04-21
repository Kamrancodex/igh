import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET handler to fetch all contact messages
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const isArchived = searchParams.get("isArchived") === "true";

    // Build query based on filters
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (typeof isArchived === "boolean") {
      query.isArchived = isArchived;
    }

    // Fetch messages with filters
    const messages = await db
      .collection("contacts")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Transform messages to ensure consistent format
    const transformedMessages = messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      createdAt: message.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      messages: transformedMessages,
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST handler to create new contact message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    // Save contact message to database
    const result = await db.collection("contacts").insertOne({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date(),
      status: "unread",
      isArchived: false,
    });

    if (!result.acknowledged) {
      throw new Error("Failed to save message to database");
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Add PUT handler to update message status
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, isArchived } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hospitality");

    const updateData: any = {};
    if (status) updateData.status = status;
    if (typeof isArchived === "boolean") updateData.isArchived = isArchived;

    const result = await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

// Add dynamic configuration
export const dynamic = "force-dynamic";
