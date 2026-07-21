import { baseApi } from "./baseApi";
import {
  ApiResponse,
  Product,
  CreateProductInput,
  UpdateProductInput,
  PaginationParams,
} from "@repo/types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, PaginationParams | void>({
      query: (params) => ({
        url: "/api/v1/products",
        params: params || {},
      }),
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, CreateProductInput>({
      query: (data) => ({
        url: "/api/v1/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: UpdateProductInput }>(
      {
        query: ({ id, data }) => ({
          url: `/api/v1/products/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: "Product", id },
          { type: "Product", id: "LIST" },
        ],
      }
    ),
    deleteProduct: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
