"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { LoginModal } from "@/components/Ui/modal";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/rtk/auth";
import { BarLoader } from "react-spinners";

export const Header = () => {
  const { push } = useRouter();

  const { data, isLoading } = useGetUserProfileQuery();
  console.log({ data, isLoading });

  const { setStep } = useContext(LoginModal);
  const buttonHandler = async () => {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    if (data) {
      if (accessToken && data?.role === "USER") {
        push("/dashboard");
      } else if (accessToken && data?.role === "ADMIN") {
        push("/admin");
        console.log(data.role);
      }
    }

    if (!refreshToken) setStep(1);
  };

  return (
    <header className="flex justify-between items-center h-16 border-b-2 border-solid p-2.5 mb-5">
      <div className="flex items-center justify-between gap-6">
        <Link href="/">
          <Image
            src="/assets/logo/divar.svg"
            width={45}
            height={40}
            alt="divar"
            className="mr-2"
          />
        </Link>
        <span className="flex text-gray-600">
          <Image
            src="/assets/logo/location.svg"
            width={20}
            height={20}
            alt="location"
          />
          <p className="mr-1">تهران</p>
        </span>
      </div>
      {isLoading && <BarLoader color="#c1240e" />}
      <div className="flex items-center justify-between gap-8 ml-4 text-gray-600">
        <button onClick={buttonHandler}>
          <span className="flex items-center gap-2">
            <Image
              src="/assets/logo/profile.svg"
              width={20}
              height={20}
              alt="profile"
            />
            <p>دیوار من</p>
          </span>
        </button>
        <button
          onClick={buttonHandler}
          className="bg-[#a62626] text-white h-10 w-20 leading-10 text-center rounded-md"
        >
          <p>ثبت اگهی</p>
        </button>
      </div>
    </header>
  );
};
