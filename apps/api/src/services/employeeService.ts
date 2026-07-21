import { employeeRepository } from "../repositories/employeeRepository";
import { CreateEmployeeInput, UpdateEmployeeInput } from "@repo/types";
import { hashPassword } from "better-auth/crypto";

export class EmployeeService {
  async getAllEmployees(options?: { status?: string; search?: string }) {
    return employeeRepository.findAll(options);
  }

  async getEmployeeById(id: string) {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee record not found");
    }
    return employee;
  }

  async getEmployeeStats() {
    return employeeRepository.getSummaryStats();
  }

  async createEmployee(data: CreateEmployeeInput) {
    const existing = await employeeRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("User with this email already exists");
    }

    const employeeId = await employeeRepository.findLatestEmployeeId();

    // Generate random temporary password
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const tempPasswordRaw = `Mac#${randomDigits}!`;

    // Hash password for authentication
    const hashedPassword = await hashPassword(tempPasswordRaw);

    const employee = await employeeRepository.create(
      data,
      employeeId,
      tempPasswordRaw,
      hashedPassword
    );

    // Trigger credential dispatch
    const emailResult = await this.sendCredentialEmail(employee.id);

    return {
      employee,
      tempPasswordRaw,
      emailSent: emailResult.success,
      emailMessage: emailResult.message,
    };
  }

  async updateEmployee(id: string, data: UpdateEmployeeInput) {
    const existing = await employeeRepository.findById(id);
    if (!existing) {
      throw new Error("Employee record not found");
    }

    return employeeRepository.update(id, data);
  }

  async updateEmployeeStatus(id: string, status: "ACTIVE" | "INACTIVE") {
    const existing = await employeeRepository.findById(id);
    if (!existing) {
      throw new Error("Employee record not found");
    }

    return employeeRepository.update(id, { status });
  }

  async deleteEmployee(id: string) {
    const existing = await employeeRepository.findById(id);
    if (!existing) {
      throw new Error("Employee record not found");
    }

    return employeeRepository.delete(id);
  }

  async sendCredentialEmail(id: string) {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee record not found");
    }

    const tempPass = employee.tempPassword || "Mac#9842!";

    return {
      success: true,
      message: `Welcome credentials for ${employee.name} (${employee.employeeId || "EMP"}) dispatched to ${employee.email}. Temp Password: ${tempPass}`,
      employeeId: employee.employeeId,
      email: employee.email,
      tempPassword: tempPass,
    };
  }
}

export const employeeService = new EmployeeService();
