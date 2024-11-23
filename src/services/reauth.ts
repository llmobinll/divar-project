import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { getCookie, setCookie } from "@/utils/cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getCookie("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}auth/check-refresh-token`,
          method: "POST",
          body: { refreshToken },
        },
        store,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken } = refreshResult!.data as {
          accessToken: string;
          refreshToken: string;
        };
        setCookie({ accessToken, refreshToken });
        result = await baseQuery(args, store, extraOptions);
      } else {
        console.error("Failed to refresh token:", refreshResult.error);
      }
    }
  }

  return result;
};
