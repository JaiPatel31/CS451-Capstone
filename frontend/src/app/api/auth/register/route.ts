import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const r = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await r.text();
    if (!r.ok) {
        return new NextResponse(text || "Registration failed", { status: r.status });
    }

    return NextResponse.json({ ok: true });
}
