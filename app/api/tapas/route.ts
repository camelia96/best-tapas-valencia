import { prisma } from "@/lib/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

// Read tapas and/or search
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filters: {}[] = [];

    // Dynamic filters
    searchParams.forEach((value, key) => {
      const trimmedVal = value.trim();

      switch (key) {
        case "name":
          filters.push({
            name: { contains: trimmedVal, mode: "insensitive" },
          });
          break;
        case "price":
          filters.push({ price: parseFloat(trimmedVal) });
          break;
        default:
          {
            filters.push({ [key]: parseInt(trimmedVal) });
          }
          break;
      }
    });

    const tapas = await prisma.tapas.findMany({
      where: {
        AND: filters,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        count: tapas.length,
        data: tapas,
      },
      { status: 200 }
    );
  } catch (error) {
    const newError = {
      error: true,
      message: "Internal Server Error",
      status: 500,
    };

    if (error instanceof PrismaClientValidationError) {
      newError.message = "Invalid search params";
      newError.status = 400;
    }

    return NextResponse.json(newError);
  }
}
