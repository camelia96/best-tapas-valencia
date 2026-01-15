import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const bar = await prisma.bares.findUnique({ where: { id: parseInt(id) } });

    // No existe bar con id seleccionado
    if (!bar) {
      return NextResponse.json({
        status: 404,
        error: "Bar no encontrada",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: bar,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: "Internal Server Error",
    });
  }
}
