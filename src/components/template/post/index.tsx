"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "react-toastify";

import { useGetCategoryQuery } from "@/services/category";
import { useAddPostMutation } from "@/services/post";

import { PostFormData } from "./types";

import "react-toastify/dist/ReactToastify.css";

export const AddPost = () => {
  const { register, handleSubmit, reset } = useForm<PostFormData>();
  const { data } = useGetCategoryQuery();
  const [addPost] = useAddPostMutation();

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value.toString());
      }
    });

    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
    try {
      const response = await addPost(formData);
      if (response.data) {
        reset();
        toast("اگهی با موفقیت اضافه شد", {
          style: {
            backgroundColor: "#a62626",
            color: "#fff",
          },
          progressStyle: {
            background: "#fffafa",
          },
        });
      }
    } catch (error) {
      toast(`Error : ${error}`, {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-8 border-b-4 border-solid border-[#a62626] w-fit pb-1.5">
        افزودن اگهی
      </h3>
      <label htmlFor="title" className="block mb-2">
        عنوان
      </label>
      <input
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        type="text"
        id="title"
        {...register("title", { required: "title is required" })}
      />
      <label htmlFor="title" className="block mb-2">
        توضیحات
      </label>
      <textarea
        className="block w-[300px] h-24 p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        id="content"
        {...register("content", { required: "content is required" })}
      />
      <label htmlFor="price" className="block mb-2">
        مبلغ
      </label>
      <input
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        type="number"
        id="price"
        {...register("price", { required: "price is required" })}
      />
      <label htmlFor="city" className="block mb-2">
        شهر
      </label>
      <input
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        type="text"
        id="city"
        {...register("city", { required: "city is required" })}
      />
      <label htmlFor="category" className="block mb-2">
        دسته بندی
      </label>
      <select
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        name="category"
        id="category"
      >
        {data?.map(({ name, _id }) => (
          <option className="bg-orange-700" key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
      <label htmlFor="images" className="block mb-2">
        عکس
      </label>
      <input
        type="file"
        id="images"
        multiple
        {...register("images", {
          required: "Please upload at least one image",
        })}
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
      />
      <button
        className="bg-[#a62626] text-white border-none py-2.5 px-6 rounded-md cursor-pointer"
        type="submit"
      >
        ایجاد
      </button>
    </form>
  );
};
