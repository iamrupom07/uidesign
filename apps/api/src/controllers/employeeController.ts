import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";
import { createSuccessResponse, asyncHandler } from "@repo/utils";
import { HTTP_STATUS } from "@repo/constants";

export const getEmployeesHandler = asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  const employees = await employeeService.getAllEmployees({ status, search });
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(employees, "Employees retrieved successfully"));
});

export const getEmployeeStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await employeeService.getEmployeeStats();
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(stats, "Employee statistics retrieved successfully"));
});

export const getEmployeeByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const employee = await employeeService.getEmployeeById(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(employee, "Employee retrieved successfully"));
});

export const createEmployeeHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await employeeService.createEmployee(req.body);
  res.status(HTTP_STATUS.CREATED).json(createSuccessResponse(result, "Employee created successfully and credentials sent"));
});

export const updateEmployeeHandler = asyncHandler(async (req: Request, res: Response) => {
  const employee = await employeeService.updateEmployee(req.params.id as string, req.body);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(employee, "Employee updated successfully"));
});

export const updateEmployeeStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const employee = await employeeService.updateEmployeeStatus(req.params.id as string, status);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(employee, "Employee status updated successfully"));
});

export const sendCredentialEmailHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await employeeService.sendCredentialEmail(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse(result, "Credential email dispatched successfully"));
});

export const deleteEmployeeHandler = asyncHandler(async (req: Request, res: Response) => {
  await employeeService.deleteEmployee(req.params.id as string);
  res.status(HTTP_STATUS.OK).json(createSuccessResponse({ success: true }, "Employee deleted successfully"));
});
