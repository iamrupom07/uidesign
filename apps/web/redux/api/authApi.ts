import { baseApi } from "./baseApi";
import { ApiResponse, LoginInput, RegisterInput, AuthSession, User } from "@repo/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "/api/v1/auth/me",
      providesTags: ["Auth"],
    }),
    login: builder.mutation<ApiResponse<AuthSession & { accessToken: string; refreshToken: string }>, LoginInput>({
      query: (credentials) => ({
        url: "/api/v1/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    register: builder.mutation<ApiResponse<AuthSession & { accessToken: string; refreshToken: string }>, RegisterInput>({
      query: (data) => ({
        url: "/api/v1/auth/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    refreshToken: builder.mutation<ApiResponse<{ accessToken: string; refreshToken: string }>, void>({
      query: () => ({
        url: "/api/v1/auth/refresh",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<ApiResponse<{ success: boolean }>, void>({
      query: () => ({
        url: "/api/v1/auth/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User", "Product", "Category"],
    }),
    updateProfile: builder.mutation<
      ApiResponse<User>,
      { name?: string; image?: string; designation?: string; phone?: string }
    >({
      query: (data) => ({
        url: "/api/v1/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    changePassword: builder.mutation<
      ApiResponse<{ success: boolean }>,
      { currentPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/api/v1/users/password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
