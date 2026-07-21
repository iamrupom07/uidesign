import { baseApi } from "./baseApi";
import { ApiResponse, FinanceRecord, CreateFinanceInput, UpdateFinanceInput } from "@repo/types";

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceRecords: builder.query<ApiResponse<FinanceRecord[]>, void>({
      query: () => "/api/v1/finance",
      providesTags: ["Finance"],
    }),
    getFinanceRecordById: builder.query<ApiResponse<FinanceRecord>, string>({
      query: (id) => `/api/v1/finance/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Finance", id }],
    }),
    createFinanceRecord: builder.mutation<ApiResponse<FinanceRecord>, CreateFinanceInput>({
      query: (data) => ({
        url: "/api/v1/finance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Finance"],
    }),
    updateFinanceRecord: builder.mutation<
      ApiResponse<FinanceRecord>,
      { id: string; data: UpdateFinanceInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/finance/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Finance"],
    }),
    deleteFinanceRecord: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/finance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetFinanceRecordsQuery,
  useGetFinanceRecordByIdQuery,
  useCreateFinanceRecordMutation,
  useUpdateFinanceRecordMutation,
  useDeleteFinanceRecordMutation,
} = financeApi;
