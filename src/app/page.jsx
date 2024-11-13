"use client";

import { SideBar } from "../components/homePage/SideBar";
import { Main } from "../components/homePage/Main";
import { useContext } from "react";
import { LoginModal } from "@/components/Ui/modal";
import { SendOtpForm } from "@/components/template/checkForm/SendOtpForm";
import { CheckOtpForm } from "@/components/template/checkForm/CheckOtpForm";
export default function Home() {
  const { step } = useContext(LoginModal);

  return (
    <div className="flex justify-between">
      <SideBar />
      <Main />
      {step === 1 && <SendOtpForm />}
      {step === 2 && <CheckOtpForm />}
    </div>
  );
}
