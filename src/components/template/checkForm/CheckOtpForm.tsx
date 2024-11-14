import { useContext, useEffect } from "react";

import { LoginModal } from "@/components/Ui/modal";

import { useCheckOtpForLoginMutation } from "@/rtk/auth";
import { setCookie } from "@/utils/cookie";

export const CheckOtpForm = () => {
  const { mobile, code, setCode, setStep } = useContext(LoginModal);

  const [checkOtpForLogin, { isLoading }] = useCheckOtpForLoginMutation();

  const submitHandler = async (event: any) => {
    console.log({ isLoading });
    event.preventDefault();
    const response = await checkOtpForLogin({
      mobile,
      code,
    });

    if (response) {
      setCookie(response.data);
      setStep();
      window.location.reload();
    }
  };

  console.log({ isLoading });

  return (
    <form onSubmit={submitHandler}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <input
        type="text"
        placeholder="کد تایید"
        className="border-black border-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        ورود
      </button>
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  );
};
