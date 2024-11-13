import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/config";
import { getCookie } from "@/utils/cookie";
import { baseQueryWithReauth } from "@/rtk/auth/reauth";
export const divarApi = createApi({
  reducerPath: "divarApi",
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
});
