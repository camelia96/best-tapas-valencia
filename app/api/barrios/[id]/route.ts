import { prisma } from "@/lib/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const parsedId = parseInt(id);

    // Validar si es numero
    if (isNaN(parsedId)) {
      throw new Error();
    }

    const barrio = await prisma.barrios.findUnique({
      where: { id: parseInt(id) },
    });

    // ID no existe
    if (!barrio) {
      return NextResponse.json({
        error: "Barrio no encontrado",
        status: 404,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: barrio,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
