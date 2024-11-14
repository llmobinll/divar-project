import { divarApi } from "@/services/divarApi";
import { CategoryResponse } from "@/types/types";

const categoryApi = divarApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoryResponse[], void>({
      query: () => "category",
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoryQuery } = categoryApi;
