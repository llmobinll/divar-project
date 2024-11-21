import React from "react";

import { CategoryForm } from "@/components/template/categoryForm";
import { ShowCategory } from "@/components/template/categoryForm/ShowCategory";

export default function page() {
  return (
    <div className="flex justify-between">
      <CategoryForm />
      <ShowCategory />
    </div>
  );
}
