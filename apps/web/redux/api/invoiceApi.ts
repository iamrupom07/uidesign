import { baseApi } from "./baseApi";
import {
  ApiResponse,
  Invoice,
  CreateInvoiceInput,
  UpdateInvoiceInput,
  InvoiceSummaryStats,
} from "@repo/types";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<
      ApiResponse<Invoice[]>,
      { status?: string; sector?: string; search?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status && params.status.toUpperCase() !== "ALL") queryParams.append("status", params.status);
        if (params?.sector && params.sector.toUpperCase() !== "ALL") queryParams.append("sector", params.sector);
        if (params?.search) queryParams.append("search", params.search);

        const queryString = queryParams.toString();
        return `/api/v1/invoices${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Invoice"],
    }),
    getInvoiceStats: builder.query<ApiResponse<InvoiceSummaryStats>, void>({
      query: () => "/api/v1/invoices/stats",
      providesTags: ["Invoice"],
    }),
    getInvoiceById: builder.query<ApiResponse<Invoice>, string>({
      query: (id) => `/api/v1/invoices/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Invoice", id }],
    }),
    createInvoice: builder.mutation<ApiResponse<Invoice>, CreateInvoiceInput>({
      query: (data) => ({
        url: "/api/v1/invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    updateInvoice: builder.mutation<
      ApiResponse<Invoice>,
      { id: string; data: UpdateInvoiceInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/invoices/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    updateInvoiceStatus: builder.mutation<
      ApiResponse<Invoice>,
      { id: string; status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled" }
    >({
      query: ({ id, status }) => ({
        url: `/api/v1/invoices/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Invoice"],
    }),
    sendInvoiceEmail: builder.mutation<
      ApiResponse<{ success: boolean; message: string; invoiceId: string; recipient: string }>,
      string
    >({
      query: (id) => ({
        url: `/api/v1/invoices/${id}/send-email`,
        method: "POST",
      }),
      invalidatesTags: ["Invoice"],
    }),
    deleteInvoice: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceStatsQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useSendInvoiceEmailMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
