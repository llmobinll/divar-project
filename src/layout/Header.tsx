import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 border-b-2 border-solid p-2.5 mb-5">
      <div className="flex items-center justify-between gap-6">
        <Link href="/">
          <Image
            src="/assets/logo/divar.svg"
            width={45}
            height={40}
            alt="divar"
            className="mr-2"
          />
        </Link>
        <span className="flex text-gray-600">
          <Image
            src="/assets/logo/location.svg"
            width={20}
            height={20}
            alt="location"
          />
          <p className="mr-1">تهران</p>
        </span>
      </div>
      <div className="flex items-center justify-between gap-8 ml-4 text-gray-600">
        <Link href="/auth">
          <span className="flex items-center gap-2">
            <Image
              src="/assets/logo/profile.svg"
              width={20}
              height={20}
              alt="profile"
            />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="bg-[#a62626] text-white h-10 w-20 leading-10 text-center rounded-md"
        >
          <p>ثبت اگهی</p>
        </Link>
      </div>
    </header>
  );
};
