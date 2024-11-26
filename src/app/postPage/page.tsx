"use client"
import { AddPost } from "@/components/template/post";
import { GetPost } from "@/components/template/post/GetPost";
import { LoaderContext } from "@/utils/loaderProvider";
import { useContext, useEffect } from "react";

export default function page() {
  const { setLoader} = useContext(LoaderContext)
  useEffect(()=> {
    setLoader("ثبت اگهی", false)
  } , [])

  return (
    <>
      <AddPost />
      <GetPost />
    </>
  );
}
