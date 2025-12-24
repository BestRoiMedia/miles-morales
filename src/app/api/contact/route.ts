import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  message: string;
};

export async function POST(req: Request) {
  let data: ContactPayload;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Missing SMTP configuration:", {
      hasHost: !!process.env.SMTP_HOST,
      hasPort: !!process.env.SMTP_PORT,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
    });
    return NextResponse.json({ error: "Email service configuration error" }, { status: 500 });
  }

  const smtpPort = Number(process.env.SMTP_PORT);
  const isSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // For TLS (port 587)
    ...(!isSecure && {
      requireTLS: true,
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates if needed
      },
    }),
  });

  try {
    // Default recipients - can be overridden with CONTACT_TO_EMAIL env var
    const defaultRecipients = ["koran.dunbar@gmail.com", "mitch@bestroi.media"];
    const recipients = process.env.CONTACT_TO_EMAIL 
      ? process.env.CONTACT_TO_EMAIL.split(",").map(email => email.trim())
      : defaultRecipients;

    await transporter.sendMail({
      from: `"DJ Miles Morales" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: data.email,
      subject: `New Booking Inquiry – ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Event Type: ${data.eventType || "N/A"}

Message:
${data.message}
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    
    // Provide helpful error messages for common issues
    if (err instanceof Error) {
      const errorMessage = err.message.toLowerCase();
      const errorCode = (err as any).code;
      
      // Authentication errors
      if (errorCode === 'EAUTH' || errorMessage.includes('535') || errorMessage.includes('authentication failed')) {
        return NextResponse.json({ 
          error: "SMTP authentication failed. Please verify your Zoho app password. If you have 2FA enabled, you must use an app-specific password, not your regular password. Generate one at: https://accounts.zoho.com/home#security/app-passwords"
        }, { status: 500 });
      }
      
      // Connection errors
      if (errorCode === 'ECONNREFUSED' || errorMessage.includes('connection')) {
        return NextResponse.json({ 
          error: "Could not connect to email server. Please check your SMTP settings."
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}

