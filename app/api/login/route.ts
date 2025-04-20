import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a simple token
    const token = randomBytes(32).toString("hex");

    // Create response with token
    const response = NextResponse.json({
      success: true,
      token,
      username: ADMIN_USER,
    });

    // Set cookie with token
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
