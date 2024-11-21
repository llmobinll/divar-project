import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/services/reauth";

export const divarApi = createApi({
  reducerPath: "divarApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "AllPost", "Posts"],

  endpoints: () => ({}),
});
