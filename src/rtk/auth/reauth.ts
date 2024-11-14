import { BASE_URL } from "@/config";
import { getCookie, setCookie } from "@/utils/cookie";
import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  store: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getCookie("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: `${BASE_URL}auth/check-refresh-token`,
          method: "POST",
          body: { refreshToken: refreshToken },
        },
        store,
        extraOptions
      );
      console.log(refreshResult);

      if (refreshResult.data) {
        const { accessToken, refreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        setCookie({ accessToken, refreshToken });
        result = await baseQuery(args, store, extraOptions);
        console.log(result);
      } else {
        console.error("Failed to refresh token:", refreshResult.error);
      }
    }
  }

  return result;
};
