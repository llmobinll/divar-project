import { divarApi } from "@/services/divarApi";

import { AddCategory, CategoryResponse } from "./types";

const categoryApi = divarApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoryResponse[], void>({
      query: () => "category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Category" as const,
                id: _id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    addCategory: build.mutation<void, AddCategory>({
      query: (data) => ({
        url: "category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: (_id) => [{ type: "Category" as const, _id }],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
