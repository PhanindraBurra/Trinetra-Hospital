import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In production, save to database or trigger notification email/SMS
    console.log("[Trinethra Hospital] New Appointment Received:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment details received and queued successfully",
        bookingId: `TRN-${Math.floor(10000 + Math.random() * 90000)}`,
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
