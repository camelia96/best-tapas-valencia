// JWT verification logic adapted from:
// https://dev.to/leapcell/implementing-jwt-middleware-in-nextjs-a-complete-guide-to-auth-1b2d
// Modifications were made to fit the project’s API structure
var jwt = require("jsonwebtoken");

import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";
export async function proxy(req: NextRequest) {
  try {
    // Get request Authorization
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
    }

    const authToken = token.split(" ")[1];

    // Verify JWT
    const payload = verifyJwt(authToken);

    if (!payload) {
      return new NextResponse("Invalid token", { status: 401 });
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError) {
      return new NextResponse("Token expired", { status: 401 });
    }
    return new NextResponse("Invalid token", { status: 401 });
  }
}

export const config = {
  matcher: [
    "/((?!api/auth/login|_next/static|_next/image|favicon.ico|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
