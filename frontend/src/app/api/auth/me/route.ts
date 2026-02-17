import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const r = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const text = await r.text();
    return new NextResponse(text, { status: r.status });
}
