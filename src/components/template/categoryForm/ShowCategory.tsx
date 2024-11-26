"use client";

import Image from "next/image";

import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/services/category";

export const ShowCategory = () => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data } = useGetCategoryQuery();

  const deleteHandler = async (id: string) => {
    try {
      await deleteCategory(id);
      toast("دسته بندی شما با موفقیت حذف شد", {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
      });
    } catch (error) {
      toast(`Error: ${error}`, {
        style: {
          backgroundColor: "#a62626",
          color: "#fff",
        },
        progressStyle: {
          background: "#fffafa",
        },
      });
    }
  };
  return (
    <div className="w-3/5">
      {data?.map(({ _id, icon, name, slug }) => (
        <div
          key={_id}
          className="flex justify-between border-solid border-gray-400 border-2 mb-4 p-3 rounded-md"
        >
          <div className="flex gap-3">
            <Image
              width={30}
              height={30}
              src={`/images/${icon}.svg`}
              alt={icon}
            />
            <h5>{name}</h5>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <p className="text-[#a62626] font-bold  ">slug: {slug}</p>
            <button
              onClick={() => deleteHandler(_id)}
              className="cursor-pointer"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
