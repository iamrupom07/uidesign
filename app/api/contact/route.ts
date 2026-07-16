import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // TODO: wire this up to an email provider (Resend, SendGrid) or CRM.
  // Keeping it a thin route handler means the form component doesn't
  // need to know how delivery is implemented.
  console.log("Contact form submission:", data);

  return NextResponse.json({ ok: true });
}
