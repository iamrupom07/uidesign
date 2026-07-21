export type EmployeeStatus = "ACTIVE" | "INACTIVE";

export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId?: string | null;
  designation?: string | null;
  phone?: string | null;
  status: EmployeeStatus;
  role: "ADMIN" | "USER" | "EMPLOYEE";
  createdAt: string | Date;
  updatedAt: string | Date;
  tempPassword?: string | null;
}

export interface CreateEmployeeInput {
  name: string;
  email: string;
  designation?: string;
  phone?: string;
  role?: "ADMIN" | "EMPLOYEE";
}

export interface UpdateEmployeeInput {
  name?: string;
  email?: string;
  designation?: string;
  phone?: string;
  status?: EmployeeStatus;
  role?: "ADMIN" | "EMPLOYEE";
}

export interface EmployeeSummaryStats {
  totalEmployees: number;
  activeCount: number;
  inactiveCount: number;
  newThisMonth: number;
}
