import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../Common/Header";
//import App.css for scrollbar styles
// import "../../App.css";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="flex h-screen items-center bg-white ">
        {/* Left Side */}
        <div className="flex h-full items-center p-2 gap-2">  
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>

        {/* Right Side */}
        <div className="flex flex-1 flex-col h-full overflow-hidden min-h-0">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 h-full overflow-auto   px-4  ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
