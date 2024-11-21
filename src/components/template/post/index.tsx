"use client";

import React, { useState } from "react";

import { toast } from "react-toastify";

import { useGetCategoryQuery } from "@/services/category";
import { useAddPostMutation } from "@/services/post";

import "react-toastify/dist/ReactToastify.css";

export const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    price: null,
    images: null,
  });
  const { data } = useGetCategoryQuery();
  const [addPost] = useAddPostMutation();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files?.[0] });
    }
  };
  const addHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const formData: FormData = new FormData();
    for (const i in form) {
      formData.append(i, form[i]);
    }
    try {
      const response = await addPost(formData);
      if (response.data) {
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
    <form onChange={changeHandler}>
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
        name="title"
      />
      <label htmlFor="title" className="block mb-2">
        توضیحات
      </label>
      <textarea
        className="block w-[300px] h-24 p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        name="content"
        id="content"
      />
      <label htmlFor="price" className="block mb-2">
        مبلغ
      </label>
      <input
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        type="number"
        id="price"
        name="price"
      />
      <label htmlFor="city" className="block mb-2">
        شهر
      </label>
      <input
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        type="text"
        id="city"
        name="city"
      />
      <label htmlFor="category" className="block mb-2">
        دسته بندی
      </label>
      <select
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
        name="category"
        id="category"
      >
        {data?.map((i) => (
          <option className="bg-orange-700" key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images" className="block mb-2">
        عکس
      </label>
      <input
        type="file"
        name="images"
        id="images"
        className="block w-[300px] p-1.5 border-solid border-gray-400 border-2 rounded-md mb-8"
      />
      <button
        className="bg-[#a62626] text-white border-none py-2.5 px-6 rounded-md cursor-pointer"
        type="submit"
        onClick={addHandler}
      >
        ایجاد
      </button>
    </form>
  );
};
