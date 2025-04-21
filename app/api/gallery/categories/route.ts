import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");
    const collection = db.collection("gallery");

    // Get unique categories from the gallery collection
    const categories = await collection.distinct("category");

    // Sort categories and ensure "all" is at the beginning
    const sortedCategories = [
      "all",
      ...categories.filter((cat) => cat !== "all").sort(),
    ];

    console.log("Found categories:", sortedCategories);

    return NextResponse.json({
      categories: sortedCategories,
      total: sortedCategories.length,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      {
        categories: ["all"],
        error: "Failed to fetch categories",
        total: 1,
      },
      { status: 500 }
    );
  }
}
