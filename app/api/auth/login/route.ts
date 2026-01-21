// JWT verification logic adapted from:
// https://dev.to/leapcell/implementing-jwt-middleware-in-nextjs-a-complete-guide-to-auth-1b2d
// Modifications were made to fit the project’s API structure

import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

var jwt = require("jsonwebtoken");

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  
  // Find user
  const user = await prisma.profiles.findFirst({
    where: { username: username },
  });

  if (!user) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 401 });
  }

  // Verify password
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  // Generate JWT
  const token = jwt.sign(
    { uuid: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN! }
  );

  if (token) {
    return NextResponse.json({ token: token });
  } else {
    return NextResponse.json({ error: "Wrong credentialsssss" }, { status: 401 });
  }
}
