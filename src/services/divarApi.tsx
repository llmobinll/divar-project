import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const divarApi = createApi({
  reducerPath: "divarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3400/",
  }),
  endpoints: () => ({}),
});
