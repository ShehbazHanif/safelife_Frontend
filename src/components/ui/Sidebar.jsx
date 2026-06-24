import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { SIDEBAR_ITEMS } from "../../utils/sidebar";

import Vector from "../../assets/Vector.svg";
import SidebarSimple from "../../assets/SidebarSimple.svg";
import SignOut from "../../assets/SignOut.svg";
import FullLogo from "../../assets/Maskgroup.png";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }d

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }
  `;

  // Helper function to check if a plural path matches singular detail routes
  const checkIsActive = (itemPath, pathname) => {
    // Direct match or nested route match
    if (pathname === itemPath || pathname.startsWith(itemPath + "/")) {
      return true;
    }

    // Handle plural-to-singular pattern (e.g., /agents -> /agent/...)
    if (itemPath.endsWith("s")) {
      const singularPath = itemPath.slice(0, -1); // Remove trailing 's'
      if (pathname.startsWith(singularPath + "/")) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* Sidebar */}
      <aside
        className={`h-full bg-primary rounded-[24px] flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden p-5 gap-4 items-start ${
          isCollapsed ? "w-[80px]" : "w-[256px]"
        }`}>
        {/* Header */}
        <div className="flex justify-between items-center self-stretch">
          {!isCollapsed ? (
            <>
              {/* Logo */}
              <img
                src={FullLogo}
                alt="SafeLife"
                className="w-[107.13px] h-8 aspect-[77/23]"
              />

              {/* Collapse Button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="flex items-center justify-center flex-shrink-0 opacity-80 transition-all hover:bg-secondary hover:rounded-lg  
                w-10 h-10">
                <img
                  src={SidebarSimple}
                  alt="Collapse Sidebar"
                  // className="w-full h-full"
                />
              </button>
            </>
          ) : (
            /* Expand Button */
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-full flex items-center justify-center">
              <img src={Vector} alt="Expand Sidebar" className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="h-px self-stretch bg-white/10" />

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-1 self-stretch">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = checkIsActive(item.path, location.pathname);

            return (
              <React.Fragment key={item.path}>
                {/* Section */}
                {item.section && !isCollapsed && (
                  <div className="pt-3 pb-1">
                    <span className="text-white-100 text-xs font-montserrat uppercase tracking-wide">
                      {item.section}
                    </span>
                  </div>
                )}

                {/* Sidebar Item */}
                <Tooltip
                  title={isCollapsed ? item.name : ""}
                  placement="right"
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        fontSize: "0.875rem",
                        padding: "5px",
                        backgroundColor: "#3CAFAA",
                        color: "white",
                      },
                    },
                  }}>
                  <Link
                    to={item.path}
                    className={`flex items-center self-stretch rounded-[12px] px-2.5 py-2 gap-2.5 transition-all ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-secondary text-white"
                        : "text-white hover:bg-white/10"
                    }`}>
                    {/* Icon */}
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-[18px] h-[18px] flex-shrink-0"
                    />

                    {/* Text */}
                    {!isCollapsed && (
                      <span className="text-xb text-white-100  font-Montserrat whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </Tooltip>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="self-stretch">
          <Tooltip
            title={isCollapsed ? "Logout" : ""}
            placement="right"
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  fontSize: "0.875rem",
                  padding: "5px",
                  backgroundColor: "#3CAFAA",
                  color: "white",
                },
              },
            }}>
            <button
              onClick={() => {
                console.log("User logged out");
              }}
              className={`w-full flex items-center rounded-[12px] px-2.5 py-2 gap-2.5 text-white transition-all hover:bg-white/10 ${
                isCollapsed ? "justify-center" : ""
              }`}>
              <img
                src={SignOut}
                alt="Logout"
                className="w-[18px] h-[18px] flex-shrink-0"
              />

              {!isCollapsed && (
                <span className="text-xb text-white-100 font-montserrat">
                  Logout
                </span>
              )}
            </button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
