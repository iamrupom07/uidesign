import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import { env } from "../config/env";

export interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT || "587", 10),
        secure: env.SMTP_PORT === "465",
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    } else {
      // Fallback stream / json transport for development/testing
      this.transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
    }
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    const { to, subject, template, data } = options;

    try {
      let templatePath = path.join(__dirname, "templates", `${template}.ejs`);
      let layoutPath = path.join(__dirname, "templates", "layouts", "main.ejs");

      if (!fs.existsSync(templatePath)) {
        const srcTemplate = path.join(__dirname, "..", "..", "src", "emails", "templates", `${template}.ejs`);
        const srcLayout = path.join(__dirname, "..", "..", "src", "emails", "templates", "layouts", "main.ejs");
        if (fs.existsSync(srcTemplate)) {
          templatePath = srcTemplate;
          layoutPath = srcLayout;
        }
      }

      if (!fs.existsSync(templatePath)) {
        console.warn(`[EmailService] Template file not found: ${templatePath}. Skipping email send.`);
        return;
      }

      const bodyContent = await ejs.renderFile(templatePath, data);
      const fullHtml = await ejs.renderFile(layoutPath, {
        subject,
        body: bodyContent,
      });

      const mailOptions = {
        from: env.EMAIL_FROM,
        to,
        subject,
        html: fullHtml,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] Email sent successfully to ${to}. MessageId: ${info.messageId}`);
    } catch (error) {
      console.error(`[EmailService] Failed to send email to ${to}:`, error);
      // Non-fatal for login / registration flow
    }
  }
}

export const emailService = new EmailService();
