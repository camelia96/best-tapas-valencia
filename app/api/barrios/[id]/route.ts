import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const barrioID = Number(id);

    // Validate type
    if (isNaN(barrioID)) {
      throw new TypeError("Barrio ID not valid");
    }

    const barrio = await prisma.barrios.findUnique({
      where: { id: barrioID },
    });

    return NextResponse.json({
      success: true,
      data: barrio,
    },{
      status: 200});
  } catch (error) {
    // Error handling based on instances
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof TypeError) {
      newError.message = error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}
