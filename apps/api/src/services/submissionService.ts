import { submissionRepository } from "../repositories/submissionRepository";
import { leadRepository } from "../repositories/leadRepository";
import { emailService } from "../emails/emailService";
import { CreateSubmissionInput, UpdateSubmissionInput } from "@repo/types";

export class SubmissionService {
  async getAllSubmissions(filter?: { type?: string; status?: string; search?: string }) {
    return submissionRepository.findAll(filter);
  }

  async getSubmissionById(id: string) {
    const submission = await submissionRepository.findById(id);
    if (!submission) {
      throw new Error("Submission not found");
    }
    return submission;
  }

  async createSubmission(data: CreateSubmissionInput) {
    const submission = await submissionRepository.create(data);

    // Auto-create lead in CRM pipeline if it's an RFP, Consultation, or detailed Contact
    try {
      if (data.email) {
        let estimatedValue = 0;
        if (data.budget) {
          if (data.budget.includes("150,000")) estimatedValue = 150000;
          else if (data.budget.includes("50,000")) estimatedValue = 50000;
          else if (data.budget.includes("20,000")) estimatedValue = 20000;
        }

        await leadRepository.create({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company || (data.sector ? `${data.sector} Facility` : "General Plant Client"),
          value: estimatedValue,
          status: "New",
          notes: `[Auto-created from ${data.type || "CONTACT"} Submission]\nSubject: ${data.subject || "N/A"}\nMessage: ${data.message}\nScope: ${data.scope || "N/A"}`,
        });
      }
    } catch (leadError) {
      console.warn("[SubmissionService] Failed to auto-create lead:", leadError);
    }

    // Asynchronously dispatch emails in background without blocking the HTTP response
    setImmediate(async () => {
      try {
        await Promise.allSettled([
          emailService.sendSubmissionNotification(submission),
          emailService.sendSubmissionConfirmation(submission),
        ]);
      } catch (emailError) {
        console.error("[SubmissionService] Error dispatching submission emails in background:", emailError);
      }
    });

    return submission;
  }

  async updateSubmission(id: string, data: UpdateSubmissionInput) {
    const existing = await submissionRepository.findById(id);
    if (!existing) {
      throw new Error("Submission not found");
    }
    return submissionRepository.update(id, data);
  }

  async deleteSubmission(id: string) {
    const existing = await submissionRepository.findById(id);
    if (!existing) {
      throw new Error("Submission not found");
    }
    return submissionRepository.softDelete(id);
  }

  async getStats() {
    return submissionRepository.getStats();
  }
}

export const submissionService = new SubmissionService();
