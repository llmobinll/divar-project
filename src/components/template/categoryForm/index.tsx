"use client";

import React, { FormEvent, useState } from "react";

import { toast } from "react-toastify";

import { useAddCategoryMutation } from "@/services/category";

import { AddCategory } from "./types";

import "react-toastify/dist/ReactToastify.css";

export const CategoryForm = () => {
  const [form, setForm] = useState<AddCategory>({
    name: "",
    slug: "",
    icon: "",
  });

  const [addCategory, { isError, isLoading }] = useAddCategoryMutation();

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    setForm({
      ...form,
      [event.currentTarget.tagName]: event.currentTarget.innerText,
    });
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await addCategory(form);
    if (response.data) {
      toast("دسته بندی با موفقیت اضافه شد", {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
      });
    } else if (isError) {
      toast("دسته بندی قبلا اضافه شده است", {
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
    <form onChange={formHandler} onSubmit={submitHandler}>
      <h3 className="mb-8 border-b-4 border-solid border-[#a62626] w-fit">
        دسته بندی
      </h3>
      <label className="block text-[1rem] mb-2.5" htmlFor="name">
        اسم دسته بندی
      </label>
      <input
        className="block w-[300px] border-solid border-slate-500 p-1.5 rounded-md mb-8"
        type="text"
        name="name"
        id="name"
        required
      />
      <label className="block text-[1rem] mb-2.5" htmlFor="slug">
        اسلاگ
      </label>
      <input
        className="block w-[300px] border-solid border-slate-500 p-1.5 rounded-md mb-8 "
        type="text"
        name="slug"
        id="slug"
      />
      <label className="block text-[1rem] mb-2.5" htmlFor="icon">
        ایکون
      </label>
      <input
        className="block w-[300px] border-solid border-slate-500 p-1.5 rounded-md mb-8"
        type="text"
        name="icon"
        id="icon"
        required
      />
      <button
        type="submit"
        className="bg-[#a62626] text-white h-10 w-20 leading-10 text-center rounded-md text-lg disabled:opacity-50"
        disabled={isLoading}
      >
        ایجاد
      </button>
    </form>
  );
};
