import React from "react";

import ContactIcon from "../../assets/AddressBook.svg";
import CalendarIcon from "../../assets/CalendarBlank.svg";
import EyeIcon from "../../assets/Eye.svg";
import StopCircleIcon from "../../assets/StopCircle.svg";
import FileIcon from "../../assets/FileText.svg";
import TrackIcon from "../../assets/Trash.svg";

const CampaignCard = () => {
  return (
    /* Parent Div Styling */
    <div
      className="flex flex-col items-start gap-[24px] self-stretch p-[16px] rounded-[16px] border border-[#F2F2F2] bg-[#F9F9F9]"
      style={{ boxShadow: "0px 1px 4px 0px rgba(128, 189, 209, 0.10)" }}>
      {/* Inner Div 1 of Parent Div */}
      <div className="flex justify-between items-center flex-[1_0_0%] w-full">
        {/* Campaign Title */}
        <h2 className="text-[#262626] font-['Montserrat'] text-[16px] font-semibold leading-[150%]">
          Campaign 1
        </h2>

        {/* Status Badge (Running) */}
        <div
          className="flex items-center gap-[8px] px-[8px] py-[2px] rounded-[100px] border border-[#90D6AB] bg-[#C2F2D2]"
          style={{ boxShadow: "0px 2px 4px 0px rgba(115, 115, 115, 0.10)" }}>
          {/* Status Dot Indicator Icon */}
          <span className="w-[6px] h-[6px] rounded-full bg-[#599F76] aspect-square" />

          {/* Status Text */}
          <span className="text-[#599F76] text-center font-['Montserrat'] text-[12px] font-semibold leading-[150%]">
            Running
          </span>
        </div>
      </div>

      {/* Inner Div 2 of Parent Div */}
      <div className="flex justify-between items-center self-stretch w-full">
        {/* Div 1 of Inner Div 2 (Pills Container) */}
        <div className="flex items-start gap-[4px]">
          {/* Total Contacts Pill */}
          <div
            className="flex items-center gap-[8px] px-[8px] py-[4px] rounded-[100px] border border-[#F2F2F2] bg-white-100"
            style={{ boxShadow: "0px 2px 4px 0px rgba(115, 115, 115, 0.10)" }}>
            {/* Contacts Icon */}

            <img className="w-4 h-4" src={ContactIcon} />

            <span className="text-[#262626] text-center font-['Montserrat'] text-[12px] font-semibold leading-[150%]">
              Total Contacts: 100
            </span>
          </div>

          {/* Created Date Pill */}
          <div
            className="flex items-center gap-[8px] px-[8px] py-[4px] rounded-[100px] border border-[#F2F2F2] bg-white-100"
            style={{ boxShadow: "0px 2px 4px 0px rgba(115, 115, 115, 0.10)" }}>
            {/* Calendar Icon */}

            <img className="w-4 h-4" src={CalendarIcon} />
            <span className="text-[#262626] text-center font-['Montserrat'] text-[12px] font-semibold leading-[150%]">
              Created: 03/11/2025 08:23 AM
            </span>
          </div>
        </div>

        {/* Div 2 of Inner Div 2 (Actions Container) */}
        <div className="flex items-center gap-[16px]">
          {/* Actions Label */}
          <span className="text-[#737373] text-center font-['Montserrat'] text-[14px] font-medium leading-[150%]">
            Actions
          </span>

          {/* Icon Wrapper Row */}
          <div className="flex items-center gap-[8px]">
            {/* View Action Button */}
            <button className="flex h-[40px] px-[8px] py-[10px] justify-center items-center gap-[8px] rounded-[100px] bg-white-100 hover:bg-gray-50 transition-colors">
              <img className="w-4 h-4" src={EyeIcon} />
            </button>

            {/* Stop/Pause Action Button */}
            <button className="flex h-[40px] px-[8px] py-[10px] justify-center items-center gap-[8px] rounded-[100px] bg-white-100 hover:bg-gray-50 transition-colors">
              <img className="w-4 h-4" src={StopCircleIcon} />
            </button>

            {/* Document/Log Action Button */}
            <button className="flex h-[40px] px-[8px] py-[10px] justify-center items-center gap-[8px] rounded-[100px] bg-white-100 hover:bg-gray-50 transition-colors">
              <img className="w-4 h-4" src={FileIcon} />
            </button>

            {/* Delete Action Button */}
            <button className="flex h-[40px] px-[8px] py-[10px] justify-center items-center gap-[8px] rounded-[16px] bg-white-100 hover:bg-red-50 transition-colors">
              <img className="w-4 h-4" src={TrackIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
