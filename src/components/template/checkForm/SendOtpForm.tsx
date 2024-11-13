import { useContext } from "react";

import { LoginModal } from "@/components/Ui/modal";

import { useSendPhoneNumberMutation } from "@/rtk/auth";

import { mobileValidation } from "@/helper";

import { IoClose } from "react-icons/io5";

export const SendOtpForm = () => {
  const [sendPhoneNumber, { data, isLoading, error }] =
    useSendPhoneNumberMutation();

  const { setStep, mobile, setMobile } = useContext(LoginModal);

  const closeHandler = () => setStep("");

  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (mobileValidation(mobile)) {
      try {
        await sendPhoneNumber(mobile);
        alert("کد تایید ارسال شد");
        setStep(2);
      } catch (error) {
        console.log(error);
      }
    } else alert("شماره خود را درست وارد کنید");
  };
  return (
    <div>
      <div>
        <button onClick={() => closeHandler(setStep())}>
          <IoClose />
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <h4>ورود به حساب کاربری</h4>
        <p>
          برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
          تایید به این شماره ارسال میشود
        </p>
        <input
          type="text"
          placeholder="شماره موبایل"
          className="border-black border-2"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <p>شرایط استفاده از خدمات و حریم خصوصی دیوار را می پذیرم </p>
        <button type="submit" disabled={isLoading}>
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
};
