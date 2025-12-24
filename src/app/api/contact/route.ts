import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  budgetRange: string;
  message: string;
}

// Send email using Zoho SMTP
async function sendEmail(formData: ContactFormData): Promise<void> {
  const smtpHost = process.env.ZOHO_SMTP_HOST || 'smtppro.zoho.com';
  const smtpPort = parseInt(process.env.ZOHO_SMTP_PORT || '587', 10);
  const smtpUser = (process.env.ZOHO_SMTP_USER || 'no-reply@djmilesmorales.com').trim();
  const smtpPass = process.env.ZOHO_SMTP_PASS?.trim();

  // Log configuration (without password) for debugging
  console.log('SMTP Configuration:', {
    host: smtpHost,
    port: smtpPort,
    user: smtpUser,
    hasPassword: !!smtpPass,
    passwordLength: smtpPass ? smtpPass.length : 0,
    passwordIsPlaceholder: smtpPass?.includes('your_zoho_smtp_password_here') || smtpPass?.includes('your password')
  });

  if (!smtpPass) {
    throw new Error('Missing ZOHO_SMTP_PASS environment variable. Please configure your SMTP password in environment variables.');
  }

  // Check if password is still the placeholder
  if (smtpPass.includes('your_zoho_smtp_password_here') || smtpPass.includes('your password')) {
    throw new Error('ZOHO_SMTP_PASS appears to be a placeholder. Please replace it with your actual app password in .env.local');
  }

  if (!smtpUser) {
    throw new Error('Missing ZOHO_SMTP_USER environment variable. Please configure your SMTP username in environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // For port 587, ensure TLS is used
    ...(smtpPort === 587 && {
      requireTLS: true,
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates if needed
      },
    }),
  });

  // Use the authenticated email as the from address (or allow override)
  // For Zoho, the from address should match the authenticated account
  const fromEmail = process.env.ZOHO_FROM_EMAIL || smtpUser;
  const toEmails = ['koran.dunbar@gmail.com', 'mitch@bestroi.media'];

  // Format event type for display
  const formatEventType = (type: string) => {
    if (!type) return 'Not specified';
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format budget range for display
  const formatBudgetRange = (range: string) => {
    if (!range) return 'Not specified';
    const ranges: Record<string, string> = {
      'under-1000': 'Under $1,000',
      '1000-2500': '$1,000 - $2,500',
      '2500-5000': '$2,500 - $5,000',
      '5000-10000': '$5,000 - $10,000',
      '10000-plus': '$10,000+',
    };
    return ranges[range] || range;
  };

  // Format the email body as HTML
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #FF2436;">New Booking Inquiry from ${formData.name}</h2>
      
      <h3 style="color: #555; margin-top: 20px;">Contact Information</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></li>
        ${formData.phone ? `<li><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></li>` : ''}
      </ul>

      <h3 style="color: #555; margin-top: 20px;">Event Details</h3>
      <ul style="list-style: none; padding: 0;">
        ${formData.eventType ? `<li><strong>Event Type:</strong> ${formatEventType(formData.eventType)}</li>` : ''}
        ${formData.eventDate ? `<li><strong>Event Date:</strong> ${new Date(formData.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>` : ''}
        ${formData.eventLocation ? `<li><strong>Event Location:</strong> ${formData.eventLocation}</li>` : ''}
        ${formData.guestCount ? `<li><strong>Estimated Guest Count:</strong> ${formData.guestCount}</li>` : ''}
        ${formData.budgetRange ? `<li><strong>Budget Range:</strong> ${formatBudgetRange(formData.budgetRange)}</li>` : ''}
      </ul>

      <h3 style="color: #555; margin-top: 20px;">Message</h3>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${formData.message}</p>
    </div>
  `;

  // Plain text version
  const textBody = `
New Booking Inquiry from ${formData.name}

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
${formData.phone ? `- Phone: ${formData.phone}` : ''}

Event Details:
${formData.eventType ? `- Event Type: ${formatEventType(formData.eventType)}` : ''}
${formData.eventDate ? `- Event Date: ${formData.eventDate}` : ''}
${formData.eventLocation ? `- Event Location: ${formData.eventLocation}` : ''}
${formData.guestCount ? `- Estimated Guest Count: ${formData.guestCount}` : ''}
${formData.budgetRange ? `- Budget Range: ${formatBudgetRange(formData.budgetRange)}` : ''}

Message:
${formData.message}
  `.trim();

  // Verify connection before sending
  try {
    await transporter.verify();
  } catch (verifyError) {
    const verifyMessage = verifyError instanceof Error ? verifyError.message : 'Unknown verification error';
    throw new Error(`SMTP connection verification failed: ${verifyMessage}`);
  }

  // Send email to all recipients
  await transporter.sendMail({
    from: `"DJ Miles Morales" <${fromEmail}>`,
    to: toEmails.join(', '),
    replyTo: formData.email,
    subject: `New Booking Inquiry from ${formData.name}`,
    text: textBody,
    html: htmlBody,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail(formData);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    // Log full error details for debugging
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Provide more detailed error information in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Error';
    
    // Log error details for debugging
    console.log('Error matching - message:', errorMessage);
    console.log('Error matching - name:', errorName);
    
    // Check for common issues (case-insensitive)
    const lowerErrorMessage = errorMessage.toLowerCase();
    if (lowerErrorMessage.includes('zoho_smtp_pass') || lowerErrorMessage.includes('missing')) {
      return NextResponse.json(
        { 
          error: 'Email service configuration error. Please check server environment variables.',
          details: isDevelopment ? errorMessage : undefined
        },
        { status: 500 }
      );
    }
    
    if (lowerErrorMessage.includes('authentication') || lowerErrorMessage.includes('invalid login') || lowerErrorMessage.includes('535') || lowerErrorMessage.includes('eauth') || lowerErrorMessage.includes('smtp connection verification failed')) {
      return NextResponse.json(
        { 
          error: 'Email authentication failed. Please check your Zoho SMTP credentials. If you have 2FA enabled, you may need to use an app-specific password instead of your regular password.',
          details: isDevelopment ? errorMessage : undefined,
          help: isDevelopment ? 'Zoho requires app-specific passwords for SMTP when 2FA is enabled. Generate one in your Zoho account settings.' : undefined
        },
        { status: 500 }
      );
    }
    
    if (lowerErrorMessage.includes('econnrefused') || lowerErrorMessage.includes('timeout')) {
      return NextResponse.json(
        { 
          error: 'Could not connect to email server. Please check SMTP settings.',
          details: isDevelopment ? errorMessage : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: isDevelopment ? errorMessage : undefined,
        errorType: isDevelopment ? errorName : undefined
      },
      { status: 500 }
    );
  }
}

