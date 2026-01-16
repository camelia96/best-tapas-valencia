import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
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

    const barsProps = [];

    for (let i = 0; i < body.length; i++) {
      const {
        nombre,
        direccion,
        web_url,
        coordinadas_latitud,
        coordinadas_longitud,
        barrio_id,
      } = body[i];

      // Validate required properties
      if (
        !(
          nombre &&
          direccion &&
          coordinadas_latitud &&
          coordinadas_longitud &&
          barrio_id
        )
      ) {
        throw new TypeError("property is missing");
      }

      // Validate correct types
      const parsedLat = Number(coordinadas_latitud);
      const parsedLong = Number(coordinadas_longitud);
      const parsedBarrioID = Number(barrio_id);

      if (
        isNaN(parsedLat) ||
        isNaN(parsedLong) ||
        isNaN(parsedBarrioID) ||
        !(typeof nombre === "string") ||
        !(typeof direccion === "string")
      ) {
        throw new TypeError("Check property type");
      }

      // Validate correct URL format
      if (web_url && !isValidHttpUrl(web_url)) {
        return NextResponse.json({
          error: "Wrong URL",
          status: 400,
        });
      }

      const barProps = {
        nombre: nombre,
        direccion: direccion,
        web_url: web_url,
        coordinadas_latitud: parsedLat,
        coordinadas_longitud: parsedLong,
        barrio_id: parsedBarrioID,
      };

      barsProps.push(barProps);
      console.log(barProps)
    }

    const newBars = await prisma.bares.createManyAndReturn({ data: barsProps });

    return NextResponse.json({
      status: 201,
      success: true,
      data: newBars,
    });
  } catch (error) {
    console.log(error)
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
