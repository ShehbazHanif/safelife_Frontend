import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="flex bg-white h-screen  gap-4">
      {/* Left Side */}
      <div className=" md:flex w-[60%]  bg-primary relative flex-col items-center rounded-r-[48px]">
        {/* Logo */}
        <div className="absolute top-6 left-6">
          <img
            src="/src/assets/Maskgroup.png"
            alt="Safelife"
            className="w-20"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-[40%] flex-col justify-center items-end ">
        <Outlet />
      </div>
    </div>
  );
}
