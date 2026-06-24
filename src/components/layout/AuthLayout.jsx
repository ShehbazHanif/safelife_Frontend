import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="flex bg-white h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-[898px]  bg-primary relative flex-col items-center rounded-r-[48px]">
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
      <div
        className="flex flex-1 flex-col justify-center items-end gap-8 "
        style={{ padding: "24px 32px" }}>
        <Outlet />
      </div>
    </div>
  );
}
