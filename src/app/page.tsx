"use client";

import { SideBar } from "../components/homePage/SideBar";
import { Main } from "../components/homePage/Main";

export default function Home() {
  return (
    <div className="flex justify-between">
      <SideBar />
      <Main />
    </div>
  );
}
