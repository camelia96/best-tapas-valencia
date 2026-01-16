import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tapaID = (await params).id;

    const tags_tapas = await prisma.tags_tapas.findMany({
      where: { tapa_id: parseInt(tapaID) },
    });
    return NextResponse.json({
      success: true,
      count: 1,
      status: 200,
      data: tags_tapas,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const tapaID = (await params).id;

    const tagsTapas = [];

    for (let i = 0; i < body.length; i++) {
      // Get prop from body
      const tag_id = body[i].tag_id;

      // Validate id - required and type
      if (!(tag_id && typeof tag_id === "number")) {
        return NextResponse.json({
          error: "Error creating Tapa tag. Check if the ID exists or its type",
          status: 400,
        });
      }

      // Create prop
      tagsTapas.push({
        tag_id: tag_id,
        tapa_id: parseInt(tapaID),
      });
    }

    const tagTapa = await prisma.tags_tapas.createManyAndReturn({
      data: tagsTapas,
    });

    return NextResponse.json({
      status: 201,
      success: true,
      data: tagTapa,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const { tag_id } = body;

    const tapaID = parseInt((await params).id);

    // Validate tag id
    if (tag_id === undefined || tag_id === null) {
      return NextResponse.json({
        error: "Tag ID property required",
        status: 400,
      });
    }

    // Validate tag id type
    if (isNaN(Number(tag_id))) {
      return NextResponse.json({
        error: "Wrong tag ID tyoe. Must be a number",
        status: 400,
      });
    }

    // Find record id
    const tagTapaToDelete = await prisma.tags_tapas.findFirst({
      where: {
        tag_id: tag_id,
        tapa_id: tapaID,
      },
    });

    // Validate found tapa
    if (!tagTapaToDelete) {
      return NextResponse.json({
        error:
          "Couldn't delete the tag associated to the current tapa. It does not exist in the database",
        status: 404,
      });
    }

    // Delete tag from tapa
    const deleteTagTapa = await prisma.tags_tapas.delete({
      where: {
        id: tagTapaToDelete.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: "",
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
