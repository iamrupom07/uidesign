import { baseApi } from "./baseApi";
import { ApiResponse, User, PaginationParams } from "@repo/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<User[]>, PaginationParams | void>({
      query: (params) => ({
        url: "/api/v1/users",
        params: params || {},
      }),
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/api/v1/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    updateUserRole: builder.mutation<ApiResponse<User>, { id: string; role: "ADMIN" | "USER" }>({
      query: ({ id, role }) => ({
        url: `/api/v1/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserRoleMutation } = userApi;
