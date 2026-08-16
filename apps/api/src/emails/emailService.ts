import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import { env } from "../config/env";

export interface EmailOptions {
  to: string;
  subject: string;
  template?: string;
  html?: string;
  data?: Record<string, any>;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    if (env.SMTP_USER && env.SMTP_PASS) {
      const isGmail = env.SMTP_HOST?.includes("gmail.com") || env.SMTP_USER.includes("@gmail.com");
      const cleanPass = env.SMTP_PASS.replace(/\s+/g, "");

      if (isGmail) {
        this.transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: env.SMTP_USER,
            pass: cleanPass,
          },
        });
      } else {
        const port = parseInt(env.SMTP_PORT || "587", 10);
        this.transporter = nodemailer.createTransport({
          host: env.SMTP_HOST || "smtp.gmail.com",
          port,
          secure: port === 465,
          auth: {
            user: env.SMTP_USER,
            pass: cleanPass,
          },
        });
      }
      console.log(`[EmailService] Transporter initialized for ${env.SMTP_USER}`);
    } else {
      // Fallback stream / json transport for development/testing
      this.transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
      console.warn("[EmailService] No SMTP credentials provided, using JSON fallback transporter.");
    }
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    const { to, subject, template, html, data = {} } = options;

    try {
      let finalHtml = html || "";

      if (template) {
        const possibleTemplatePaths = [
          path.join(__dirname, "templates", `${template}.ejs`),
          path.join(__dirname, "..", "emails", "templates", `${template}.ejs`),
          path.join(__dirname, "..", "..", "src", "emails", "templates", `${template}.ejs`),
          path.join(process.cwd(), "src", "emails", "templates", `${template}.ejs`),
          path.join(process.cwd(), "apps", "api", "src", "emails", "templates", `${template}.ejs`),
        ];

        const possibleLayoutPaths = [
          path.join(__dirname, "templates", "layouts", "main.ejs"),
          path.join(__dirname, "..", "emails", "templates", "layouts", "main.ejs"),
          path.join(__dirname, "..", "..", "src", "emails", "templates", "layouts", "main.ejs"),
          path.join(process.cwd(), "src", "emails", "templates", "layouts", "main.ejs"),
          path.join(process.cwd(), "apps", "api", "src", "emails", "templates", "layouts", "main.ejs"),
        ];

        const templatePath = possibleTemplatePaths.find((p) => fs.existsSync(p));
        const layoutPath = possibleLayoutPaths.find((p) => fs.existsSync(p));

        if (templatePath) {
          const bodyContent = await ejs.renderFile(templatePath, data);
          if (layoutPath) {
            finalHtml = await ejs.renderFile(layoutPath, {
              subject,
              body: bodyContent,
            });
          } else {
            finalHtml = bodyContent;
          }
        } else {
          console.warn(`[EmailService] Template '${template}' not found. Falling back to simple HTML.`);
          finalHtml = `<div style="font-family: sans-serif; padding: 20px;"><h2>${subject}</h2><p>${JSON.stringify(data, null, 2)}</p></div>`;
        }
      }

      const mailOptions = {
        from: env.EMAIL_FROM || "MacProtec Engineering <macprotecengineering@gmail.com>",
        to,
        subject,
        html: finalHtml,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] Email sent successfully to ${to}. MessageId: ${info.messageId || "ok"}`);
    } catch (error) {
      console.error(`[EmailService] Failed to send email to ${to}:`, error);
    }
  }

  public async sendSubmissionNotification(submission: any): Promise<void> {
    const adminEmail = "macprotecengineering@gmail.com";
    const appUrl = env.CLIENT_URL || "http://localhost:3000";

    await this.sendEmail({
      to: adminEmail,
      subject: `[MacProtec ${submission.type}] New Submission from ${submission.name} - ${submission.subject || "Project Inquiry"}`,
      template: "submissionNotification",
      data: {
        ...submission,
        dashboardUrl: `${appUrl}/dashboard/submissions`,
      },
    });
  }

  public async sendSubmissionConfirmation(submission: any): Promise<void> {
    if (!submission.email) return;

    await this.sendEmail({
      to: submission.email,
      subject: `[MacProtec Engineering] Inquiry Received - ${submission.subject || "Process Engineering Request"}`,
      template: "submissionConfirmation",
      data: submission,
    });
  }
}

export const emailService = new EmailService();
