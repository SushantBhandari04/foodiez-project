import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


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
