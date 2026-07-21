import { baseApi } from "./baseApi";
import {
  ApiResponse,
  BlogPost,
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogSummaryStats,
} from "@repo/types";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query<
      ApiResponse<BlogPost[]>,
      { status?: string; category?: string; sector?: string; search?: string; published?: boolean } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status && params.status !== "ALL") queryParams.append("status", params.status);
        if (params?.category && params.category !== "ALL") queryParams.append("category", params.category);
        if (params?.sector && params.sector !== "ALL") queryParams.append("sector", params.sector);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.published !== undefined) queryParams.append("published", String(params.published));

        const queryString = queryParams.toString();
        return `/api/v1/blogs${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Blog"],
    }),
    getBlogStats: builder.query<ApiResponse<BlogSummaryStats>, void>({
      query: () => "/api/v1/blogs/stats",
      providesTags: ["Blog"],
    }),
    getBlogPostById: builder.query<ApiResponse<BlogPost>, string>({
      query: (id) => `/api/v1/blogs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blog", id }],
    }),
    getBlogPostBySlug: builder.query<ApiResponse<BlogPost>, string>({
      query: (slug) => `/api/v1/blogs/slug/${slug}`,
      providesTags: ["Blog"],
    }),
    createBlogPost: builder.mutation<ApiResponse<BlogPost>, CreateBlogPostInput>({
      query: (data) => ({
        url: "/api/v1/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlogPost: builder.mutation<
      ApiResponse<BlogPost>,
      { id: string; data: UpdateBlogPostInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/blogs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    toggleBlogPostPublish: builder.mutation<
      ApiResponse<BlogPost>,
      { id: string; isPublished: boolean }
    >({
      query: ({ id, isPublished }) => ({
        url: `/api/v1/blogs/${id}/publish`,
        method: "PATCH",
        body: { isPublished },
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlogPost: builder.mutation<ApiResponse<{ success: boolean }>, string>({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    uploadCloudinaryImage: builder.mutation<
      ApiResponse<{ url: string; public_id?: string; provider?: string }>,
      { image: string; folder?: string }
    >({
      query: (data) => ({
        url: "/api/v1/upload/cloudinary",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useGetBlogStatsQuery,
  useGetBlogPostByIdQuery,
  useGetBlogPostBySlugQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useToggleBlogPostPublishMutation,
  useDeleteBlogPostMutation,
  useUploadCloudinaryImageMutation,
} = blogApi;
