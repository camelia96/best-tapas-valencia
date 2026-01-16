import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tapaID = Number((await params).id);

    // Validate ID type
    if (isNaN(tapaID)) {
      throw new TypeError("Tapa ID not valid");
    }

    // Find tapas's tags
    const tags_tapas = await prisma.tags_tapas.findMany({
      where: { tapa_id: tapaID },
    });

    return NextResponse.json({
      success: true,
      count: 1,
      status: 200,
      data: tags_tapas,
    });
  } catch (error) {
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
      const tag_id = Number(body[i].tag_id);

      // Validate id - required and type
      if (!tag_id || isNaN(tag_id)) {
        throw new TypeError(
          "Error creating Tapa tag. Check if the ID exists or its type"
        );
      }

      // Create prop
      tagsTapas.push({
        tag_id: tag_id,
        tapa_id: Number(tapaID),
      });
    }

    const tagTapa = await prisma.tags_tapas.createManyAndReturn({
      data: tagsTapas,
      skipDuplicates: true,
    });

    return NextResponse.json({
      status: 201,
      success: true,
      data: tagTapa,
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
        "There was a problem trying to create the record. Check if the IDs exist in the database";
      newError.status = 400;
    } else if (error instanceof TypeError) {
      newError.message = error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get tapa ID
    const tapaID = Number((await params).id);

    // Validate tapa ID
    if (isNaN(tapaID)) {
      throw new TypeError("Tapa ID not valid");
    }

    // Get tags to delete
    const tagsParams = req.nextUrl.searchParams.getAll("tag_id")[0];

    // Validate URL params
    if (tagsParams === undefined || tagsParams === null) {
      throw new TypeError("Error: Couldn't delete tags. No URL params.");
    }

    // Validate tag_ids
    const tagsIDS = tagsParams.split(",").map((t) => {
      const parsedTag = Number(t);

      if (isNaN(parsedTag)) {
        throw new TypeError("Tag ID not valid");
      }

      return parsedTag;
    });

    // Delete tags
    const deletedTagsTapa = await prisma.tags_tapas.deleteMany({
      where: {
        tag_id: {
          in: tagsIDS,
        },
        tapa_id: tapaID,
      },
    });

    return NextResponse.json({
      success: true,
      data: deletedTagsTapa,
      status: 204,
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
