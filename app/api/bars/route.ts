import { bars } from "@/generated/prisma/client";
import { isValidHttpUrl } from "@/lib/functions";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

type BarCreate = Pick<
  bars,
  | "name"
  | "direction"
  | "web_url"
  | "latitude_coord"
  | "longitude_coord"
  | "area_id"
>;

// Create bar
export async function GET(req: NextRequest) {
  try {
    const bars = await prisma.bars.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        count: bars.length,
        data: bars,
      },
      {
        status: 200,
      }
    );
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

    const barsProps: BarCreate[] = [];

    for (let i = 0; i < body.length; i++) {
      const {
        name,
        direction,
        web_url,
        latitude_coord,
        longitude_coord,
        area_id,
      } = body[i];

      // Validate required properties
      if (
        !(name && direction && latitude_coord && longitude_coord && area_id)
      ) {
        throw new TypeError("property is missing");
      }

      // Validate correct types
      const parsedLat = Number(latitude_coord);
      const parsedLong = Number(longitude_coord);
      const parsedBarrioID = Number(area_id);

      if (
        isNaN(parsedLat) ||
        isNaN(parsedLong) ||
        isNaN(parsedBarrioID) ||
        !(typeof name === "string") ||
        !(typeof direction === "string")
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
        name: name,
        direction: direction,
        web_url: web_url,
        latitude_coord: parsedLat,
        longitude_coord: parsedLong,
        area_id: parsedBarrioID,
      };

      barsProps.push(barProps);
    }

    const newBars = await prisma.bars.createManyAndReturn({ data: barsProps });

    return NextResponse.json(
      {
        success: true,
        data: newBars,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    // Error handling based on instances
    const newError = {
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
    return NextResponse.json(
      { error: true, message: newError.message },
      { status: newError.status }
    );;
  }
}
