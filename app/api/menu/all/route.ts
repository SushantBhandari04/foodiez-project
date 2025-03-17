import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all menu items
export async function GET(req: NextRequest) {

  try {

    const menuItems = await prisma.menuItem.findMany();

    return NextResponse.json(menuItems);
  }
  catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}
