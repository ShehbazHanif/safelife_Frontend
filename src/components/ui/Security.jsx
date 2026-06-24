import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import PasswordModel from "./PasswordModel";

const Security = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Main Card Container
    <div className="flex flex-col justify-center items-start self-stretch p-6 rounded-2xl border border-[#F2F2F2] bg-[#F9F9F9] shadow-[0_1px_4px_0_rgba(133,146,173,0.10)] font-['Montserrat'] gap-3 w-full">
      {/* Component Title */}
      <h3 className="text-[#0B1220] text-base ]">Security Settings</h3>

      {/* Settings Row Content */}
      <div className="flex justify-between items-center self-stretch w-full">
        {/* Left Side: Icon & Details */}
        <div className="flex items-center gap-3">
          {/* Icon Wrapper Box */}
          <div className="flex w-12 h-12 p-3 items-center justify-center gap-2 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
            {/* Lock Outline Icon */}
            <svg
              className="w-5 h-5 text-[#0B1220]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Label Description Column */}
          <div className="flex flex-col items-start gap-1 bg-transparent">
            <span className="text-[#0B1220] text-sm ">Password</span>
            <span className="text-gray-800 text-xb ">
              Last changed 45 days ago
            </span>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <Button
          className=" h-10 px-4  items-center gap-2 !border !border-[#EAEAEA] !rounded-[16px] !bg-white-100 !text-[#262626] text-sm font-medium shadow-sm hover:bg-gray-50 transition-all"
          onClick={() => setIsOpen(true)}>
          Change Password
        </Button>
      </div>
      <PasswordModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Security;
