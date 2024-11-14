import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/rtk/auth/reauth";
export const divarApi = createApi({
  reducerPath: "divarApi",
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
});
