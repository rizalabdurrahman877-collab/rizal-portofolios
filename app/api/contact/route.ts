import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // SEND EMAIL
    // ==========================================

    const { data, error } =
      await resend.emails.send({
        from: "Rizal Portfolio <onboarding@resend.dev>",

        to: [
          "rizalabdurrahman603@gmail.com",
        ],

        replyTo: email,

        subject:
          `Portfolio Message from ${name}`,

        html: `
          <!DOCTYPE html>

          <html>
            <head>
              <meta charset="UTF-8" />

              <title>
                New Portfolio Message
              </title>
            </head>

            <body
              style="
                margin: 0;
                padding: 0;
                background: #f5f5f5;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 40px auto;
                  background: white;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow:
                    0 10px 30px
                    rgba(0, 0, 0, 0.08);
                "
              >

                <!-- HEADER -->

                <div
                  style="
                    padding: 30px;
                    background: #171326;
                    color: white;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                    "
                  >
                    New Portfolio Message
                  </h1>

                  <p
                    style="
                      margin: 8px 0 0;
                      color: #c9c3d9;
                    "
                  >
                    Someone contacted you
                    through your portfolio
                    website.
                  </p>
                </div>

                <!-- CONTENT -->

                <div
                  style="
                    padding: 30px;
                  "
                >

                  <!-- NAME -->

                  <div
                    style="
                      margin-bottom: 24px;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 6px;
                        color: #777;
                        font-size: 13px;
                      "
                    >
                      NAME
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 16px;
                        font-weight: bold;
                        color: #222;
                      "
                    >
                      ${escapeHtml(name)}
                    </p>
                  </div>

                  <!-- EMAIL -->

                  <div
                    style="
                      margin-bottom: 24px;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 6px;
                        color: #777;
                        font-size: 13px;
                      "
                    >
                      EMAIL
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 16px;
                        color: #222;
                      "
                    >
                      ${escapeHtml(email)}
                    </p>
                  </div>

                  <!-- MESSAGE -->

                  <div>
                    <p
                      style="
                        margin: 0 0 6px;
                        color: #777;
                        font-size: 13px;
                      "
                    >
                      MESSAGE
                    </p>

                    <div
                      style="
                        padding: 16px;
                        background: #f7f7f8;
                        border-radius: 10px;
                        color: #333;
                        line-height: 1.7;
                        white-space: pre-wrap;
                      "
                    >
                      ${escapeHtml(message)}
                    </div>
                  </div>

                </div>

                <!-- FOOTER -->

                <div
                  style="
                    padding: 20px 30px;
                    background: #f7f7f8;
                    color: #888;
                    font-size: 12px;
                  "
                >
                  This message was sent
                  from Rizal's portfolio
                  website.
                </div>

              </div>
            </body>
          </html>
        `,
      });

    // ==========================================
    // RESEND ERROR
    // ==========================================

    if (error) {
      console.error(
        "Resend error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to send email.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error(
      "Server error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// SECURITY
// ==========================================

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}