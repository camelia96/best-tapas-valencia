import { tapas } from "@/generated/prisma/client";
import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type TapaCreate = Pick<
  tapas,
  "nombre" | "precio" | "descripcion" | "imagen_url" | "categoria_id" | "bar_id"
>;

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
      const nombre = body[i].nombre;
      const precio = body[i].precio;
      const descripcion = body[i].descripcion;
      const imagen_url = body[i].imagen_url;
      const categoria_id = body[i].categoria_id;

      // Validate required properties
      if (!nombre || !precio || !categoria_id) {
        return NextResponse.json({
          error: "Error creating new data. Property is missing",
          status: 400,
        });
      }

      // Validate property types
      if (
        !(typeof nombre === "string") ||
        !(typeof precio === "number") ||
        (descripcion && !(typeof descripcion === "string")) ||
        !(typeof categoria_id === "number")
      ) {
        return NextResponse.json({
          error: "Error creating new data. Check property type",
          status: 400,
        });
      }

      // Validate correct URL
      if (imagen_url && !isValidHttpUrl(imagen_url)) {
        return NextResponse.json({
          error: "Error creating new data. Wrong URL",
          status: 400,
        });
      }

      // New object to create
      validatedTapas.push({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagen_url: imagen_url,
        categoria_id: categoria_id,
        // Add current bar_id from route params
        bar_id: parseInt(id),
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
    console.log(error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
