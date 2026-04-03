import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Rate limit: 3 requests per email per 15 minutes
    const rl = rateLimit(`forgot:${email.toLowerCase()}`, {
      limit: 3,
      windowSec: 900,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Always return success to avoid email enumeration
    const successResponse = NextResponse.json({
      message: "If an account exists with that email, a reset link has been sent.",
    });

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      // User doesn't exist or uses OAuth only — don't reveal this
      return successResponse;
    }

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    });

    // Create reset token (expires in 1 hour)
    const token = randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your LaunchStack password",
      html: passwordResetEmailHtml(user.name || "there", resetUrl),
    }).catch(() => {
      // Don't fail the request if email sending fails
    });

    return successResponse;
  } catch (error) {
    console.error("[forgot-password] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function passwordResetEmailHtml(name: string, resetUrl: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4f46e5;">Reset Your Password</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to choose a new one:</p>
      <p>
        <a href="${resetUrl}"
           style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 8px;">
          Reset Password
        </a>
      </p>
      <p style="color: #666; font-size: 14px;">
        This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
      </p>
      <p style="color: #666; font-size: 14px;">— The LaunchStack Team</p>
    </div>
  `;
}
