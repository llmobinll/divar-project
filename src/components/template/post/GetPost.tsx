"use client";

import Image from "next/image";

import React from "react";

import { TiDeleteOutline } from "react-icons/ti";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDeletePostMutation, useGetPostQuery } from "@/services/post";

export const GetPost = () => {
  const { data, isLoading } = useGetPostQuery();
  const [deletePost] = useDeletePostMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deletePost(id);
      toast("دسته بندی شما با موفقیت حذف شد", {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
        autoClose: 2000,
      });
    } catch (error) {
      toast(`Error:${error}`);
    }
  };
  return (
    <div className="mt-20">
      <h1 className="text-xl border-solid border-b-4 border-[#a62626] w-fit pb-1.5 mb-10">
        اگهی های شما
      </h1>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#a62626", "#a62626", "#f8b26a", "#a62626", "#a6266"]}
        />
      ) : (
        data?.posts.map((p) => (
          <div
            key={p._id}
            className="flex items-center border-2 border-solid border-[#eaeaea] rounded-md mt-2.5 mb-2.5 p-1.5 "
          >
            <Image
              className="rounded-sm ml-8"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${p.images}`}
              width={100}
              height={70}
              alt={p.options.title}
            />
            <div className="w-full">
              <p className="text-base">{p.options.title}</p>
              <span className="text-sm text-gray-500">{p.options.content}</span>
            </div>
            <div className="w-[150px] text-center">
              <p className="text-base">
                {new Date(p.createdAt).toLocaleDateString("fa-IR")}
              </p>
              <span className="text-sm text-gray-500">
                {p.options.price} تومان
              </span>
            </div>
            <div>
              <button onClick={() => deleteHandler(p._id.toString())}>
                <TiDeleteOutline className="w-8 h-8" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
