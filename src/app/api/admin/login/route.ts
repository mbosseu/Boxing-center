import { NextRequest, NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    const validPassword = process.env.ADMIN_PASSWORD || "admin123"; // En prod, mettre ça dans .env.local

    if (password === validPassword) {
      const token = await signAdminToken();
      
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: "admin_session",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24h
      });
      
      return response;
    }

    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
