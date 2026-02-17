import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const r = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await r.text();
    if (!r.ok) {
        return new NextResponse(text || "Login failed", { status: r.status });
    }

    const data = JSON.parse(text) as { token: string };

    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return res;
}
