import { baseApi } from "./baseApi";
import {
  ApiResponse,
  Employee,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeSummaryStats,
} from "@repo/types";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      ApiResponse<Employee[]>,
      { status?: string; search?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status && params.status !== "ALL") queryParams.append("status", params.status);
        if (params?.search) queryParams.append("search", params.search);

        const queryString = queryParams.toString();
        return `/api/v1/employees${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Employee"],
    }),
    getEmployeeStats: builder.query<ApiResponse<EmployeeSummaryStats>, void>({
      query: () => "/api/v1/employees/stats",
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query<ApiResponse<Employee>, string>({
      query: (id) => `/api/v1/employees/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Employee", id }],
    }),
    createEmployee: builder.mutation<
      ApiResponse<{
        employee: Employee;
        tempPasswordRaw: string;
        emailSent: boolean;
        emailMessage: string;
      }>,
      CreateEmployeeInput
    >({
      query: (data) => ({
        url: "/api/v1/employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<
      ApiResponse<Employee>,
      { id: string; data: UpdateEmployeeInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployeeStatus: builder.mutation<
      ApiResponse<Employee>,
      { id: string; status: "ACTIVE" | "INACTIVE" }
    >({
      query: ({ id, status }) => ({
        url: `/api/v1/employees/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Employee"],
    }),
    sendCredentialEmail: builder.mutation<
      ApiResponse<{
        success: boolean;
        message: string;
        employeeId?: string;
        email: string;
        tempPassword?: string;
      }>,
      string
    >({
      query: (id) => ({
        url: `/api/v1/employees/${id}/send-credentials`,
        method: "POST",
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeStatsQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useUpdateEmployeeStatusMutation,
  useSendCredentialEmailMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
