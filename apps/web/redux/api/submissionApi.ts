import { baseApi } from "./baseApi";
import {
  ApiResponse,
  Submission,
  CreateSubmissionInput,
  UpdateSubmissionInput,
  SubmissionStats,
} from "@repo/types";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissions: builder.query<
      ApiResponse<Submission[]>,
      { type?: string; status?: string; search?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params && typeof params === "object") {
          if (params.type && params.type !== "ALL") queryParams.append("type", params.type);
          if (params.status && params.status !== "ALL") queryParams.append("status", params.status);
          if (params.search) queryParams.append("search", params.search);
        }
        const qs = queryParams.toString();
        return `/api/v1/submissions${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Submission"],
    }),

    getSubmissionById: builder.query<ApiResponse<Submission>, string>({
      query: (id) => `/api/v1/submissions/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Submission", id }],
    }),

    getSubmissionStats: builder.query<ApiResponse<SubmissionStats>, void>({
      query: () => "/api/v1/submissions/stats/overview",
      providesTags: ["Submission"],
    }),

    createSubmission: builder.mutation<ApiResponse<Submission>, CreateSubmissionInput>({
      query: (data) => ({
        url: "/api/v1/submissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Submission", "Lead"],
    }),

    updateSubmission: builder.mutation<
      ApiResponse<Submission>,
      { id: string; data: UpdateSubmissionInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/submissions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Submission", "Lead"],
    }),

    deleteSubmission: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/submissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Submission", "Lead"],
    }),
  }),
});

export const {
  useGetSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useGetSubmissionStatsQuery,
  useCreateSubmissionMutation,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = submissionApi;
