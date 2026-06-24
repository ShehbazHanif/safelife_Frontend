import BellRinging from "../../assets/BellRinging.svg";
export default function Header() {
  return (
    <header className="bg-white p-3 md:p-4 flex items-center justify-end border-b border-gray-300">
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button className="relative flex items-center justify-center w-10 h-10 hover:bg-secondary rounded-lg transition-colors">
          <img src={BellRinging} alt="Notifications" className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-300">
          <button className="w-10 h-10 rounded-full bg-primary text-white-100 font-bold flex items-center justify-center">
            A
          </button>
          <div className="hidden sm:block ">
            <p className="text-xb font-Montserrat  text-[#262626]">
              Administrator
            </p>
            <p className="text-xs font-Montserrat text-[#737373]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
