"use client";

import Link from "next/link";
import Image from "next/image";

import React from "react";

import { BiCategory } from "react-icons/bi";

import { useGetCategoryQuery } from "@/services/category";

export const SideBar = () => {
  const { data, isLoading } = useGetCategoryQuery();

  return (
    <div>
      {isLoading && <h1>در حال دریافت اطلاعات...</h1>}
      <div className="flex justify-center items-center gap-1 mb-9 text-gray-700">
        <BiCategory className="text-2xl " />
        <h1 className="text-xl">دسته بندی</h1>
      </div>
      <div>
        <div>
          {data?.map((i) => (
            <ul key={i._id} className="flex justify-between mb-4">
              <span>
                <Image
                  src={`/images/${i.icon}.svg`}
                  width={20}
                  height={20}
                  alt={i.icon}
                />
              </span>
              <Link href="/" className="text-sm text-gray-600">
                {i.name}
              </Link>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
