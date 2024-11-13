"use client";
import { useState } from "react";
import { createContext } from "react";

export const LoginModal = createContext();

export default function ModalProvider({ children }) {
  const [step, setStep] = useState();
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <LoginModal.Provider
      value={{ step, setStep, mobile, setMobile, code, setCode }}
    >
      {children}
    </LoginModal.Provider>
  );
}
