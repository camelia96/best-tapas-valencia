import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const areaID = Number(id);

    // Validate type
    if (isNaN(areaID)) {
      throw new TypeError("Area ID not valid");
    }

    const area = await prisma.areas.findUnique({
      where: { id: areaID },
    });

    return NextResponse.json(
      {
        success: true,
        data: area,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Error handling based on instances
    const newError = {
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof TypeError) {
      newError.message = error.message;
      newError.status = 400;
    }
    return NextResponse.json(
      { error: true, message: newError.message },
      { status: newError.status }
    );
  }
}
