import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const barID = Number(id);

    // Validate ID type
    if (isNaN(barID)) {
      throw new TypeError("Invalid bar ID type");
    }

    // Find bar
    const bar = await prisma.bares.findUnique({ where: { id: parseInt(id) } });

    
    return NextResponse.json({
      status: 200,
      success: true,
      data: bar,
    });
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
