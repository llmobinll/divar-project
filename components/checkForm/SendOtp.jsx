import { IoClose } from "react-icons/io5";

export const SendOtp = () => {
  return (
    <div>
      <div>
        <button>
          <IoClose />
        </button>
        <h4>ورود به حساب کاربری</h4>
      </div>
      <p>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره ارسال میشود
      </p>
      <input
        type="text"
        placeholder="شماره موبایل"
        className="border-black border-2"
      />
      <p>شرایط استفاده از خدمات و حریم خصوصی دیوار را می پذیرم </p>
      <button>تایید</button>
    </div>
  );
};
