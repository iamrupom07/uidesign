import { baseApi } from "./baseApi";
import { ApiResponse, Category, CreateCategoryInput, UpdateCategoryInput } from "@repo/types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/api/v1/categories",
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `/api/v1/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),
    createCategory: builder.mutation<ApiResponse<Category>, CreateCategoryInput>({
      query: (data) => ({
        url: "/api/v1/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation<
      ApiResponse<Category>,
      { id: string; data: UpdateCategoryInput }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
    deleteCategory: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/api/v1/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
