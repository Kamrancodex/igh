import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface Socials {
  instagram: string;
  facebook: string;
  twitter: string;
  website: string;
}

interface Business {
  _id?: ObjectId;
  name: string;
  image: string;
  description: string;
  link: string;
  socials: Socials;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET all businesses
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("hospitality");

    const businesses = await db
      .collection<Business>("businesses")
      .find()
      .toArray();

    const transformedBusinesses = businesses.map((business) => {
      let image = business.image || "";
      
      // Override images for specific businesses
      if (business.name === "Fa-ray's") {
        image = "/FaRays_Logo.png";
      } else if (business.name === "Hog Heaven") {
        image = "/HH.png";
      } else if (business.name === "The JNG Grill") {
        image = "/JNG.png";
      }

      return {
        _id: business._id?.toString() || "",
        name: business.name || "",
        image: image,
        description: business.description || "",
        link: business.link || "",
        socials: business.socials || {
          instagram: "",
          facebook: "",
          twitter: "",
          website: "",
        },
      };
    });

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
    const data = (await request.json()) as Omit<Business, "_id">;

    const result = await db.collection<Business>("businesses").insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const insertedBusiness = await db
      .collection<Business>("businesses")
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
    const { id, ...updateData } = data as { id: string } & Partial<Business>;

    const result = await db.collection<Business>("businesses").findOneAndUpdate(
      { _id: new ObjectId(id) },
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

    const result = await db.collection<Business>("businesses").deleteOne({
      _id: new ObjectId(id),
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
