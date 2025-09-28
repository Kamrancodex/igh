import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Debug logging (remove in production)
    console.log("Login attempt:", {
      receivedUsername: username,
      expectedUsername: ADMIN_USER,
      hasPassword: !!password,
      hasExpectedPassword: !!ADMIN_PASS,
      usernameMatch: username === ADMIN_USER,
      passwordMatch: password === ADMIN_PASS
    });

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
