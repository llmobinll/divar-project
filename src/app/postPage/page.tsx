import React from "react";

import { AddPost } from "@/components/template/post";
import { GetPost } from "@/components/template/post/GetPost";

export default function page() {
  return (
    <>
      <AddPost />
      <GetPost />
    </>
  );
}
