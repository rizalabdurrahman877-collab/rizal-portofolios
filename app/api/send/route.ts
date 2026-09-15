import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    // Ambil API Key dari Environment Variable
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

    // Ambil data dari form
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    // Validasi field
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // Validasi format email
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

    // Kirim email menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: "Rizal Portfolio <onboarding@resend.dev>",

      // Email tujuan
      to: ["rizalabdurrahman877@gmail.com"],

      // Jika membalas email, akan diarahkan ke email pengunjung
      replyTo: email,

      subject: `Portfolio Message from ${name}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Portfolio Message</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 30px;
              background: #f5f5f5;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 16px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              "
            >
              <h1
                style="
                  margin-top: 0;
                  color: #111111;
                "
              >
                New Portfolio Message
              </h1>

              <p>
                <strong>Name:</strong>
              </p>

              <p>
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Email:</strong>
              </p>

              <p>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <div
                style="
                  background: #f5f5f5;
                  padding: 15px;
                  border-radius: 10px;
                  white-space: pre-wrap;
                  line-height: 1.6;
                "
              >
                ${escapeHtml(message)}
              </div>

              <p
                style="
                  margin-top: 25px;
                  color: #777777;
                  font-size: 13px;
                "
              >
                Sent from Rizal Portfolio
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Jika Resend mengembalikan error
    if (error) {
      console.error("RESEND ERROR:", {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Gagal mengirim email.",
        },
        { status: 500 }
      );
    }

    // Jika berhasil
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}

// Escape HTML untuk mencegah HTML injection
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}