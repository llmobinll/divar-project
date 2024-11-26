"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

import {
  useCheckOtpForLoginMutation,
  useSendPhoneNumberMutation,
} from "@/services/auth";

import { setCookie } from "@/utils/cookie";

import { mobileValidation } from "@/helper";

import "react-toastify/dist/ReactToastify.css";

export const AuthenticationModal = ({ onClose }: { onClose: () => void }) => {
  const [sendPhoneNumber, { isLoading: isSendingPhone }] =
    useSendPhoneNumberMutation();

  const [checkOtpForLogin, { isLoading: isCheckingOtp }] =
    useCheckOtpForLoginMutation();

  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const sendMobileHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (mobileValidation(mobile)) {
      try {
        await sendPhoneNumber(mobile);
        toast("کد تایید ارسال شد", {
          style: {
            backgroundColor: "#a62626",
            color: "#fff",
          },
          progressStyle: {
            background: "#fffafa",
          },
        });
        setStep(2);
      } catch (error) {
        toast(`Error : ${error}`);
      }
    } else
      toast("شماره خود را به درستی وارد کنید", {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
      });
  };

  const checkOtpHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await checkOtpForLogin({
      mobile,
      code,
    });

    if (response) {
      setCookie(response.data);
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#fff] rounded-lg border-2 border-[#a62626] border-solid px-7 relative w-2/5 h-2/7 zIndex:20 ">
      <button onClick={onClose}>
        <IoClose className=" absolute text-[#a62626] text-xl top-2 left-2 " />
      </button>
      <h4 className="text-xl font-semibold mb-10 ">ورود به حساب کاربری</h4>

      {step === 1 ? (
        <div>
          <p className="mb-5">
            برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
            .تایید به این شماره ارسال میشود.
          </p>
          <input
            type="text"
            placeholder="شماره موبایل"
            className="border-black border-2 mb-4"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <p className="font-semibold mb-4">
            شرایط استفاده از خدمات و حریم خصوصی دیوار را می پذیرم.
          </p>
          <button
            onClick={sendMobileHandler}
            disabled={isSendingPhone}
            style={{ opacity: isSendingPhone ? 0.5 : 1 }}
            className="leading-10 text-center rounded-md bg-[#a62626] text-white h-10 w-20"
          >
            ارسال کد تایید
          </button>
        </div>
      ) : (
        <div>
          <h4 className="mb-5 font-semibold text-lg">تایید کد ارسال شده :</h4>
          <p className="text-lg mb-5">
            کد پیامک شده به شماره {mobile} را وارد کنید
          </p>
          <input
            type="text"
            placeholder="کد تایید"
            className="border-black border-2 mb-5"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex gap-8 mb-5">
            <button
              onClick={checkOtpHandler}
              disabled={isCheckingOtp}
              className="leading-10 text-center rounded-md bg-[#a62626] text-white text-lg h-10 w-20"
            >
              ورود
            </button>
            <button
              onClick={() => setStep(1)}
              className="leading-10 text-center rounded-md bg-[#a62626] text-white h-10 w-20"
            >
              تغییر شماره
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
