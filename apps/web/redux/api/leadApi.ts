import { baseApi } from "./baseApi";
import { ApiResponse, Lead, CreateLeadInput, UpdateLeadInput } from "@repo/types";

export const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<ApiResponse<Lead[]>, void>({
      query: () => "/api/v1/leads",
      providesTags: ["Lead"],
    }),
    getLeadById: builder.query<ApiResponse<Lead>, string>({
      query: (id) => `/api/v1/leads/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Lead", id }],
    }),
    createLead: builder.mutation<ApiResponse<Lead>, CreateLeadInput>({
      query: (data) => ({
        url: "/api/v1/leads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    updateLead: builder.mutation<ApiResponse<Lead>, { id: string; data: UpdateLeadInput }>({
      query: ({ id, data }) => ({
        url: `/api/v1/leads/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    deleteLead: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/leads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadApi;
