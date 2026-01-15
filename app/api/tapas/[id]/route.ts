import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const tapa = await prisma.tapas.findUnique({ where: { id: parseInt(id) } });

    // No existe tapa con id seleccionado
    if (!tapa) {
      return NextResponse.json({
        status: 404,
        error: "Tapa no encontrada",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: tapa,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: "Internal Server Error",
    });
  }
}
