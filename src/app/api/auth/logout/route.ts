import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mb_session")?.value;

    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete("mb_session");
    return response;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json({ success: true });
  }
}
