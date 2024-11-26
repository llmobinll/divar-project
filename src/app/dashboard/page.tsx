"use client";

import Link from "next/link";

import React from "react";

import { FaPhoneFlip } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";

import { GetPost } from "@/components/template/post/GetPost";

import { useGetUserProfileQuery } from "@/services/auth";

export default function page() {
  const { data } = useGetUserProfileQuery();

  return (
    <div>
      <h1 className="mb-5 text-xl border-solid border-b-4 border-[#a62626] w-fit pb-1.5">
        اطلاعات کاربر
      </h1>
      <div className="flex gap-2 items-baseline">
        <FaPhoneFlip />

        <p className="mb-3 text-lg">شماره تلفن : {data?.mobile}</p>
      </div>
      <div className="flex items-center gap-2">
        <LuCalendarClock className="w-5 h-5" />
        <p className="mb-3 text-lg">
          تاریخ ورود :{new Date(data!.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>
      {data?.role === "ADMIN" && (
        <div className="bg-[#a62626] text-white p-2 mt-7 rounded-md w-fit">
          <Link href="/dashboard/admin">تنظیمات</Link>
        </div>
      )}
      <GetPost />
    </div>
  );
}
