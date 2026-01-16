import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

// Create bar
export async function GET(req: NextRequest) {
  try {
    const bars = await prisma.bares.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      count: bars.length,
      data: bars,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      nombre,
      direccion,
      web_url,
      coordinadas_latitud,
      coordinadas_longitud,
      barrio_id,
    } = body;

    // Validate required properties
    if (
      !nombre ||
      !direccion ||
      !coordinadas_latitud ||
      !coordinadas_longitud ||
      !barrio_id
    ) {
      return NextResponse.json({
        error: "Error creating new data. Property is missing",
        status: 400,
      });
    }

    // Validate correct types
    if (
      !(typeof coordinadas_latitud === "number") ||
      !(typeof coordinadas_longitud === "number") ||
      !(typeof barrio_id === "number") ||
      !(typeof nombre === "string") ||
      !(typeof direccion === "string")
    ) {
      return NextResponse.json({
        error: "Error creating new data. Check property type",
        status: 400,
      });
    }

    // Validate correct URL format
    if (web_url && !isValidHttpUrl(web_url)) {
      return NextResponse.json({
        error: "Error creating new data. Wrong URL",
        status: 400,
      });
    }

    const barProps = {
      nombre: nombre,
      direccion: direccion,
      web_url: web_url,
      coordinadas_latitud: coordinadas_latitud,
      coordinadas_longitud: coordinadas_longitud,
      barrio_id: barrio_id,
    };

    /* const newBar = await prisma.bares.create({ data: barProps }); */

    return NextResponse.json({
      status: 201,
      success: true,
      data: barProps,
    });
  } catch (e) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
