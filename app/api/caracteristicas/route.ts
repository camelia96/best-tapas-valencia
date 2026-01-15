import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const caracteristicas = await prisma.caracteristicas.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      count: caracteristicas.length,
      data: caracteristicas,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
