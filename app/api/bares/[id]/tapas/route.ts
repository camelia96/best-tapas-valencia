import { tapas } from "@/generated/prisma/client";
import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

type TapaCreate = Pick<
  tapas,
  "nombre" | "precio" | "descripcion" | "imagen_url" | "categoria_id" | "bar_id"
>;

// Read tapas from specific bar
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const barID = Number((await params).id);

    // Validate bar ID
    if (isNaN(barID)) {
      throw new TypeError("Invalid ID");
    }

    // Get tapas from bar
    const tapasBar = await prisma.tapas.findMany({ where: { bar_id: barID } });

    return NextResponse.json({
      success: true,
      count: tapasBar.length,
      data: tapasBar,
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
      newError.message = "Cannot fetch data: " + error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}

// Create tapas for specific bar
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const validatedTapas: TapaCreate[] = [];

    // Validate array of tapas objects
    for (let i = 0; i < body.length; i++) {
      const { nombre, precio, descripcion, imagen_url, categoria_id } = body[i];

      // Validate required properties
      if (!(nombre && precio && categoria_id)) {
        throw new TypeError("Property is missing");
      }

      const parsedPrice = Number(precio);
      const parsedCategoryID = Number(categoria_id);

      // Validate property types
      if (
        !(typeof nombre === "string") ||
        (descripcion && !(typeof descripcion === "string")) ||
        isNaN(parsedPrice) ||
        isNaN(parsedCategoryID)
      ) {
        throw new TypeError("Check property type");
      }

      // Validate correct URL
      if (imagen_url && !isValidHttpUrl(imagen_url)) {
        throw new TypeError("Wrong URL");
      }

      // New object to create
      validatedTapas.push({
        nombre: nombre,
        precio: parsedPrice,
        descripcion: descripcion,
        imagen_url: imagen_url,
        categoria_id: parsedCategoryID,

        // Add current bar_id from route params
        bar_id: Number(id),
      });
    }

    // Create all tapas
    const newTapas = await prisma.tapas.createManyAndReturn({
      data: validatedTapas,
    });

    return NextResponse.json({
      success: true,
      status: 201,
      data: newTapas,
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
        "There was a problem trying to create the record. Check if the entered IDs exist in the database";
      newError.status = 400;
    } else if (error instanceof TypeError) {
      newError.message = "Error creating new data: " + error.message;
      newError.status = 400;
    }
    return NextResponse.json(newError);
  }
}
