import { NextResponse } from "next/server";

// TODO(database step): persist submissions. For now this validates and logs only,
// so nothing is stored once the process or serverless instance goes away.
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = str(b.name, 80);
  const url = str(b.url, 300);
  const email = str(b.email, 200);
  const description = str(b.description, 800);
  if (!name || !description) return NextResponse.json({ error: "Please fill in the tool name and description." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Please enter a full website URL starting with https://" }, { status: 400 });
  }
  console.log("[submission]", JSON.stringify({ name, url, email, description, plan: b.plan, industries: b.industries, problems: b.problems }));
  return NextResponse.json({ ok: true }, { status: 202 });
}
