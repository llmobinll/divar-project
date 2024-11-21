import Image from "next/image";

import React from "react";

import { BASE_URL } from "@/config";

import { useGetAllPostQuery } from "@/services/post";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Main = () => {
  const { data } = useGetAllPostQuery();

  return (
    <div className="w-3/4">
      <ToastContainer position="top-center" style={{ zIndex: 9999 }} />

      {data?.posts.map((p) => (
        <div
          key={p._id}
          className="flex items-center border-2 border-solid border-[#eaeaea] rounded-md mt-2.5 mb-2.5 p-1.5 "
        >
          <Image
            className="rounded-sm ml-8 w-[100px] h-[70px]"
            src={`${BASE_URL}${p.images}`}
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
        </div>
      ))}
    </div>
  );
};
