import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  try {
    const res = await fetch(`${base}/departments`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to load departments" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load departments" }, { status: 502 });
  }
}
