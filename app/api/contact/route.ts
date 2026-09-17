import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
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

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid.",
        },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY belum diatur.");

      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi email belum tersedia.",
        },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL belum diatur.");

      return NextResponse.json(
        {
          success: false,
          message: "Email tujuan belum dikonfigurasi.",
        },
        { status: 500 }
      );
    }

    // 1. Simpan pesan ke Supabase
    const { error: supabaseError } = await supabase
      .from("pesan_kontak")
      .insert({
        nama: name,
        email,
        pesan: message,
      });

    if (supabaseError) {
      console.error("SUPABASE CONTACT ERROR:", supabaseError);

      return NextResponse.json(
        {
          success: false,
          message: "Pesan gagal disimpan ke database.",
        },
        { status: 500 }
      );
    }

    // 2. Kirim email menggunakan Resend
    const { error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `Pesan baru dari ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="id">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #080a16;
              font-family: Arial, Helvetica, sans-serif;
              color: #ffffff;
            "
          >
            <div
              style="
                max-width: 600px;
                margin: 40px auto;
                padding: 30px;
                background: #111426;
                border-radius: 18px;
                border: 1px solid #272c48;
              "
            >
              <h1
                style="
                  margin-top: 0;
                  font-size: 24px;
                  color: #8d7cff;
                "
              >
                Pesan Baru dari Portfolio
              </h1>

              <p style="color: #b8bdd4;">
                Seseorang mengirim pesan melalui website portfolio kamu.
              </p>

              <div
                style="
                  margin-top: 25px;
                  padding: 20px;
                  background: #080a16;
                  border-radius: 14px;
                "
              >
                <p>
                  <strong>Nama</strong><br />
                  ${escapeHtml(name)}
                </p>

                <p>
                  <strong>Email</strong><br />
                  ${escapeHtml(email)}
                </p>

                <p>
                  <strong>Pesan</strong><br />
                  ${escapeHtml(message).replace(/\n/g, "<br />")}
                </p>
              </div>

              <p
                style="
                  margin-top: 25px;
                  font-size: 13px;
                  color: #777d98;
                "
              >
                Email ini dikirim otomatis dari website portfolio.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (resendError) {
      console.error("RESEND ERROR:", resendError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Pesan sudah tersimpan di database, tetapi email gagal dikirim.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim.",
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

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