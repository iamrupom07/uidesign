import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    credentials: "include", // Ensures HTTP-only auth cookies are sent with requests
  }),
  tagTypes: ["User", "Auth", "Product", "Category", "Lead", "Finance", "Invoice", "Employee", "Blog"],
  endpoints: () => ({}),
});
