import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:5000";
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
