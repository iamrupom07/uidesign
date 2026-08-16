import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const payload = {
      type: data.type || "CONTACT",
      name: data.name || "Anonymous Contact",
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject || "Contact Inquiry",
      message: data.message || "No message content provided.",
      sector: data.sector,
      budget: data.budget,
      startDate: data.startDate,
      scope: data.scope,
      files: data.files,
    };

    const response = await fetch(`${apiUrl}/api/v1/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
