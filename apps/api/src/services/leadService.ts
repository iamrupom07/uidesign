import { leadRepository } from "../repositories/leadRepository";
import { CreateLeadInput, UpdateLeadInput } from "@repo/types";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS } from "@repo/constants";

export class LeadService {
  async getAllLeads() {
    return leadRepository.findAll();
  }

  async getLeadById(id: string) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Lead not found");
    }
    return lead;
  }

  async createLead(input: CreateLeadInput) {
    return leadRepository.create(input);
  }

  async updateLead(id: string, input: UpdateLeadInput) {
    await this.getLeadById(id);
    return leadRepository.update(id, input);
  }

  async deleteLead(id: string) {
    await this.getLeadById(id);
    return leadRepository.softDelete(id);
  }
}

export const leadService = new LeadService();
