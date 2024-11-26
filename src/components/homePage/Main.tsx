import Image from "next/image";

import { useGetAllPostQuery } from "@/services/post";

export const Main = () => {
  const { data } = useGetAllPostQuery();

  return (
    <div className="w-3/4">
      {data?.posts.map(
        ({ _id, options: { title, content, price }, createdAt, images }) => (
          <div
            key={_id}
            className="flex items-center border-2 border-solid border-[#eaeaea] rounded-md mt-2.5 mb-2.5 p-1.5 "
          >
            <Image
              className="rounded-sm ml-8 w-[100px] h-[70px]"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${images}`}
              width={100}
              height={70}
              alt={title}
            />
            <div className="w-full">
              <p className="text-base">{title}</p>
              <span className="text-sm text-gray-500">{content}</span>
            </div>
            <div className="w-[150px] text-center">
              <p className="text-base">
                {new Date(createdAt).toLocaleDateString("fa-IR")}
              </p>
              <span className="text-sm text-gray-500">{price} تومان</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};
