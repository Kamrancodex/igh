import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Find and delete all gallery items with empty categories
    const result = await Gallery.deleteMany({
      $or: [
        { category: { $exists: false } },
        { category: "" },
        { category: null },
      ],
    });

    return NextResponse.json({
      message: `Cleaned up ${result.deletedCount} incomplete gallery items`,
    });
  } catch (error) {
    console.error("Error cleaning up gallery:", error);
    return NextResponse.json(
      { error: "Failed to clean up gallery items" },
      { status: 500 }
    );
  }
}
