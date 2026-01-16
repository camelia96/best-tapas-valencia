import { prisma } from "@/lib/prisma";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const tapaID = Number(id);

    // Validate type
    if (isNaN(tapaID)) {
      throw new TypeError("Tapa ID not valid");
    }

    const tapa = await prisma.tapas.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      data: tapa,
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

// Delete single tapa
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tapaID = Number((await params).id);

    // Validate type
    if (isNaN(tapaID)) {
      throw new TypeError("Incorrect tapa ID");
    }

    // Transaction -> Delete both tags and tapa OR rollback
    const deletedTagsTapa = prisma.tags_tapas.deleteMany({
      where: { tapa_id: tapaID },
    });
    const deletedTapa = prisma.tapas.delete({ where: { id: tapaID } });

    await prisma.$transaction([deletedTagsTapa, deletedTapa]);

    return NextResponse.json({
      success: true,
      data: deletedTapa,
      status: 204,
    });
  } catch (error) {
    // Error handling based on instances
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof PrismaClientKnownRequestError) {
      newError.message =
        "There was a problem when deleting the data. Try again later.";
      newError.status = 400;
    } else if (error instanceof TypeError) {
      newError.message = error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}
