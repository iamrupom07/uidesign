import { financeRepository } from "../repositories/financeRepository";
import { CreateFinanceInput, UpdateFinanceInput } from "@repo/types";
import { ApiError } from "../middleware/errorHandler";
import { HTTP_STATUS } from "@repo/constants";

export class FinanceService {
  async getAllRecords() {
    return financeRepository.findAll();
  }

  async getRecordById(id: string) {
    const record = await financeRepository.findById(id);
    if (!record) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Finance record not found");
    }
    return record;
  }

  async createRecord(input: CreateFinanceInput) {
    return financeRepository.create(input);
  }

  async updateRecord(id: string, input: UpdateFinanceInput) {
    await this.getRecordById(id);
    return financeRepository.update(id, input);
  }

  async deleteRecord(id: string) {
    await this.getRecordById(id);
    return financeRepository.softDelete(id);
  }
}

export const financeService = new FinanceService();
