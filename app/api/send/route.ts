import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY belum dikonfigurasi.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Rizal Portfolio <onboarding@resend.dev>",

      to: ["rizalabdurrahman603@gmail.com"],

      replyTo: email,

      subject: `Portfolio Message from ${name}`,

      html: `
        <!DOCTYPE html>
        <html>
          <body style="
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 30px;
          ">
            <div style="
              max-width: 600px;
              margin: auto;
              background: white;
              padding: 30px;
              border-radius: 16px;
            ">
              <h1>New Portfolio Message</h1>

              <p><strong>Name:</strong></p>
              <p>${escapeHtml(name)}</p>

              <p><strong>Email:</strong></p>
              <p>${escapeHtml(email)}</p>

              <p><strong>Message:</strong></p>

              <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 10px;
                white-space: pre-wrap;
              ">
                ${escapeHtml(message)}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengirim email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}