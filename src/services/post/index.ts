import { divarApi } from "../divarApi";

import { ApiResponse } from "./types";

const postApi = divarApi.injectEndpoints({
  endpoints: (build) => ({
    addPost: build.mutation<void, FormData>({
      query: (formData: FormData) => ({
        url: "post/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [
        { type: "Posts", id: "LIST" },
        { type: "AllPost", id: "LIST" },
      ],
    }),
    getPost: build.query<ApiResponse, void>({
      query: () => "post/my",
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(
                ({ _id }) => ({ type: "Posts", id: _id }) as const
              ),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_id) => [
        { type: "Posts", _id },
        { type: "Posts", id: "LIST" },
        { type: "AllPost", _id },
        { type: "AllPost", id: "LIST" },
      ],
    }),
    getAllPost: build.query<ApiResponse, void>({
      query: () => "http://localhost:3400",
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(
                ({ _id }) => ({ type: "Posts", id: _id }) as const
              ),
              { type: "AllPost", id: "LIST" },
            ]
          : [{ type: "AllPost", id: "LIST" }],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useGetAllPostQuery,
} = postApi;
