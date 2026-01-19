import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const barrios = await prisma.barrios.findMany({
    orderBy: { id: "asc" },
  });

  try {
    return NextResponse.json({
      success: true,
      count: barrios.length,
      data: barrios,
    },{
      status: 200});
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
