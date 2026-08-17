import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    // In browser, relative URL ensures same-origin requests on any domain/IP
    return "";
  }
  return process.env.INTERNAL_API_URL || "http://127.0.0.1:5000";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    credentials: "include", // Ensures HTTP-only auth cookies are sent with requests
  }),
  // Cache retention & performance tuning
  keepUnusedDataFor: 300, // Keep cache in memory for 5 minutes
  refetchOnFocus: false, // Prevent redundant refetch when window regains focus
  refetchOnReconnect: true,
  tagTypes: ["User", "Auth", "Product", "Category", "Lead", "Finance", "Invoice", "Employee", "Blog", "Submission"],
  endpoints: () => ({}),
});
