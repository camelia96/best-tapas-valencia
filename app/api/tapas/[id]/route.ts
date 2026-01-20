import { tapas } from "@/generated/prisma/client";
import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

type TapasUpdate = Partial<tapas>;
// Get tapa
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

    return NextResponse.json(
      {
        success: true,
        data: tapa,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Error handling based on instances
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof TypeError) {
      newError.message = "Cannot fetch data: " + error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}

// Update tapa
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get current tapa ID
    const tapaID = Number((await params).id);

    //Validate tapa id
    if (isNaN(tapaID)) {
      throw new TypeError("Tapa ID invalid type");
    }

    // Get data to update
    const body = await req.json();
    const { name, price, description, image_url, category_id, bar_id } =
      body;

    // Validate non-nullable properties exist
    if (!(name && price && category_id && bar_id)) {
      throw new TypeError("Property is missing");
    }

    // Validate properties type
    const parsedPrice = Number(price);
    const parsedCategoryID = Number(category_id);
    const parsedBarID = Number(bar_id);

    if (
      isNaN(parsedPrice) ||
      isNaN(parsedCategoryID) ||
      isNaN(parsedBarID) ||
      !(typeof name === "string") ||
      (description && !(typeof description === "string"))
    ) {
      throw new TypeError("Check property type");
    }

    // Validate correct URL
    if (image_url && !isValidHttpUrl(image_url)) {
      throw new TypeError("Wrong URL");
    }

    // Update object
    const updatedTapa = await prisma.tapas.update({
      data: {
        name: name,
        description: description,
        image_url: image_url,
        bar_id: parsedBarID,
        category_id: parsedCategoryID,
        price: parsedPrice
      },
      where: { id: tapaID },
    });
    return NextResponse.json(
      {
        success: true,
        data: updatedTapa,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    // Error handling based on instances
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof TypeError) {
      newError.message = "Error updating data: " + error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}

// Update one property
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get current tapa ID
    const tapaID = Number((await params).id);

    //Validate tapa id
    if (isNaN(tapaID)) {
      throw new TypeError("Tapa ID invalid type");
    }

    // Get data to update
    const body = await req.json();

    const { name, price, description, image_url, category_id, bar_id } =
      body;

    // Validate properties type if they exist
    const parsedPrice = Number(price);
    const parsedCategoryID = Number(category_id);
    const parsedBarID = Number(bar_id);

    if (
      (price !== undefined && isNaN(parsedPrice)) ||
      (category_id !== undefined && isNaN(parsedCategoryID)) ||
      (bar_id !== undefined && isNaN(parsedBarID)) ||
      (name && !(typeof name === "string")) ||
      (description && !(typeof description === "string"))
    ) {
      throw new TypeError("Check property type");
    }

    // Validate correct URL
    if (image_url && !isValidHttpUrl(image_url)) {
      throw new TypeError("Wrong URL");
    }

    // Generate new tapa to update with dynamic props
    const update: TapasUpdate = {};

    if (price !== undefined) update["price"] = parsedPrice;

    if (bar_id !== undefined) update["bar_id"] = parsedBarID;

    if (category_id !== undefined) update["category_id"] = parsedCategoryID;

    if (name !== undefined) update["name"] = name;

    if (description !== undefined) update["description"] = description;

    // Update object
    const updatedTapa = await prisma.tapas.update({
      data: update,
      where: { id: tapaID },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedTapa,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    // Error handling based on instances
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof PrismaClientKnownRequestError) {
      newError.message =
        "There was a problem trying to update the record's field. Check if the entered IDs exist in the database";
      newError.status = 400;
    } else if (error instanceof TypeError) {
      newError.message =
        "Error updating tapa property or properties: " + error.message;
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
      newError.message = "Error deleting data: " + error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}
