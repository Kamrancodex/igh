import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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
