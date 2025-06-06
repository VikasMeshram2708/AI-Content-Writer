/**
 * This file contains the mailer utility functions.
 */

import nodemailer from "nodemailer";

const { MAIL_TRAP_HOST, MAIL_TRAP_PORT, MAIL_TRAP_USER, MAIL_TRAP_PASS } =
  process.env;

if (!MAIL_TRAP_HOST || !MAIL_TRAP_PORT || !MAIL_TRAP_USER || !MAIL_TRAP_PASS) {
  throw new Error("Mail trap environment variables are not set");
}

export const transporter = nodemailer.createTransport({
  host: MAIL_TRAP_HOST,
  port: +MAIL_TRAP_PORT, // Convert to number
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL_TRAP_USER,
    pass: MAIL_TRAP_PASS,
  },
});

// on login
export async function emailOnLogin(clientEmail: string) {
  try {
    if (!clientEmail.trim()) return;
    const info = await transporter.sendMail({
      from: '"Content Flow" <admin@contentflow.com>',
      to: clientEmail,
      subject: "Welcome Back!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #4CAF50;">Login Successful</h2>
          <p>Hi there,</p>
          <p>Your login to Content Flow was successful. If this wasn't you, please contact support immediately.</p>
          <p style="margin-top: 20px;">Best regards,<br>Content Flow Team</p>
        </div>
      `,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (e) {
    console.log(e);
    throw new Error(
      `Login Email Failed - ${(e as Error).message ?? "Something went wrong."}`
    );
  }
}

export async function emailOnRegister(clientEmail: string) {
  try {
    if (!clientEmail.trim()) return;
    const info = await transporter.sendMail({
      from: '"Content Flow" <admin@contentflow.com>',
      to: clientEmail,
      subject: "Welcome to Content Flow!",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #4CAF50;">Registration Successful</h2>
        <p>Hi there,</p>
        <p>Thank you for registering with Content Flow. We're excited to have you on board!</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p style="margin-top: 20px;">Best regards,<br>Content Flow Team</p>
      </div>
      `,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (e) {
    console.log(e);
    throw new Error(
      `Register Email Failed - ${(e as Error).message ?? "Something went wrong."}`
    );
  }
}
