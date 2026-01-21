import { JwtPayload, verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Verify token
    const token = req.headers.get("authorization");
    const payload = token ? verifyJwt(token.split(" ")[1]) : null;

    // Check if user exists
    if (!payload) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    // Get user
    const user: JwtPayload = { uuid: payload.uuid, username: payload.username, iat: payload.iat, exp: payload.iat };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
  }
}
