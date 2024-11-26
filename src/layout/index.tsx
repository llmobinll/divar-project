"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {  useContext, useState } from "react";
import { BarLoader } from "react-spinners";

import { AuthenticationModal } from "@/components/template/checkForm";

import { useGetUserProfileQuery } from "@/services/auth";

import { getCookie } from "@/utils/cookie";
import { LoaderContext } from "@/utils/loaderProvider";

export const Header = () => {
  const {loaders , setLoader} = useContext(LoaderContext)
  const [showModal, setShowModal] = useState(false);

  const {push} = useRouter();

  const { data, isLoading } = useGetUserProfileQuery();

  const loadingButtonHandler = (key:string) => {
    setLoader(key , !loaders[key])
  }
  

  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const buttonHandler = () => {
    if (data) {
      if (accessToken) {
        push("/dashboard");
        loadingButtonHandler("دیوار من")
      }
    }
    if (!refreshToken) {
      setShowModal(true);
    }
  };

  const AdButtonHandler = () => {
    if (data) {
      if (accessToken) {
        push("/postPage");
        loadingButtonHandler("ثبت اگهی")


      }
    }

    if (!refreshToken) setShowModal(true);
  };

  return (
    <header className="flex justify-between items-center h-16 border-b-2 border-solid p-2.5 mb-5">
      <div className="flex items-center justify-between gap-6">
        <Link href="/">
          <Image
            src="/images/divar.svg"
            width={45}
            height={40}
            alt="divar"
            className="mr-2"
          />
        </Link>
        <span className="flex text-gray-600">
          <Image
            src="/images/location.svg"
            width={20}
            height={20}
            alt="location"
          />
          <p className="mr-1">تهران</p>
        </span>
      </div>
      {isLoading && <BarLoader color="#c1240e" />}
      <div className="flex items-center justify-between gap-8 ml-4 text-gray-600">
        <button onClick={buttonHandler}   >
          <span className="flex items-center gap-2">
            <Image
              src="/images/profile.svg"
              width={20}
              height={20}
              alt="profile"
            />
            <p>{loaders["دیوار من"] ? "درحال بارگذاری..." : "دیوار من"}</p>
          </span>
        </button>
        <button
          onClick={AdButtonHandler}
          className="bg-[#a62626] text-white h-fit w-fit p-2 text-center rounded-md "
        >
          <p>{loaders["ثبت اگهی"] ? "درحال بارگذاری..." :  "ثبت اگهی"}</p>
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center zIndex:10 ">
          <AuthenticationModal onClose={() => setShowModal(false)} />
        </div>
      )}
    </header>
  );
};
