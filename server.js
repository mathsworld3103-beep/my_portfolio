
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// RESEND
// ==========================================

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio server is running!"
    });
});

// ==========================================
// CONTACT FORM
// ==========================================

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        // ==========================================
        // VALIDATION
        // ==========================================

        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });

        }

        // ==========================================
        // EMAIL VALIDATION
        // ==========================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });

        }

        // ==========================================
        // SEND EMAIL
        // ==========================================

        const { data, error } = await resend.emails.send({

            from: "Portfolio Contact <onboarding@resend.dev>",

            to: ["mathsworld3103@gmail.com"],

            subject: `New Portfolio Message from ${name}`,

            html: `
                <!DOCTYPE html>

                <html>

                <head>
                    <meta charset="UTF-8">
                    <title>Portfolio Contact</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background:#f4f7fb;
                    font-family:Arial,sans-serif;
                ">

                    <div style="
                        max-width:650px;
                        margin:40px auto;
                        background:#ffffff;
                        border-radius:12px;
                        overflow:hidden;
                        box-shadow:0 5px 20px rgba(0,0,0,0.08);
                    ">

                        <div style="
                            background:#111827;
                            color:#ffffff;
                            padding:25px;
                        ">

                            <h2 style="margin:0;">
                                New Portfolio Message
                            </h2>

                            <p style="
                                margin:8px 0 0;
                                color:#cbd5e1;
                            ">
                                Someone contacted you through your portfolio.
                            </p>

                        </div>

                        <div style="padding:30px;">

                            <p>
                                <strong>Name:</strong>
                                ${escapeHtml(name)}
                            </p>

                            <p>
                                <strong>Email:</strong>
                                ${escapeHtml(email)}
                            </p>

                            <hr style="
                                border:none;
                                border-top:1px solid #e5e7eb;
                                margin:25px 0;
                            ">

                            <h3>
                                Message
                            </h3>

                            <p style="
                                line-height:1.7;
                                color:#374151;
                                white-space:pre-wrap;
                            ">
                                ${escapeHtml(message)}
                            </p>

                        </div>

                        <div style="
                            padding:20px 30px;
                            background:#f9fafb;
                            color:#6b7280;
                            font-size:13px;
                        ">

                            Sent from your portfolio contact form.

                        </div>

                    </div>

                </body>

                </html>
            `
        });

        // ==========================================
        // RESEND ERROR
        // ==========================================

        if (error) {

            console.error("Resend error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to send your message right now."
            });

        }

        // ==========================================
        // SUCCESS
        // ==========================================

        console.log("Email sent:", data);

        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error("Contact form error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });

    }

});

// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(`
========================================
Portfolio Server
========================================
Server: http://localhost:${PORT}
Contact API: http://localhost:${PORT}/api/contact
========================================
    `);

});
