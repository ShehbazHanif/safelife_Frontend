import React from "react";
// Note: Replace these with your actual icon components (e.g., Lucide-react, Heroicons, etc.)
import { Copy, MoreHorizontal, ArrowUpRight } from "lucide-react";
import DotThreeIcon from "../../assets/DotsThree.svg";
import CopyIcon from "../../assets/CopySimple.svg";
import ArrowUpRightGrayIcon from "../../assets/ArrowUpRight.svg";
import avatar from "../../assets/avatar 1.png";
import ArrowUpRightBlueIcon from "../../assets/ArrowUpRightBlue.svg";

export const AgentCard = ({ name, id, lastUpdated, tags, avatarUrl }) => {
  return (
    <div className="flex flex-col items-start gap-6 p-4 flex-1 shrink-0 basis-0 rounded-2xl border border-[#F2F2F2] bg-[#F9F9F9] shadow-[0_1px_4px_0_rgba(128,189,209,0.10)] min-w-[280px] ">
      {/* Div 1 of Inner Div: Top Row (ID & Actions) */}
      <div className="flex justify-between items-center self-stretch">
        {/* Inner div 1 of Div 1: ID Badge */}
        <div className="flex py-1 px-2 justify-center items-center gap-2 rounded-[100px] border border-gray-300 bg-white-100 shadow-[0_2px_4px_0_rgba(115,115,115,0.05)]">
          <span className="text-gray-800 font-montserrat text-xs ">{id}</span>
          <img
            src={CopyIcon}
            alt="Copy"
            className="w-4 h-4 text-gray-500 cursor-pointer"
          />
        </div>

        {/* Inner Div 2 of Div 1: More Option Button */}
        <div className="flex p-2 justify-center items-center gap-2 rounded-[100px] hover:bg-gray-100 cursor-pointer">
          <img
            src={DotThreeIcon}
            alt="More options"
            className="w-4 h-4 text-gray-500"
          />
        </div>
      </div>

      {/* Div 2 of inner Div: Bottom Content (Avatar, Name, Tags/Date, & Action Arrow) */}
      <div className="flex flex-col justify-center items-start gap-2 self-stretch">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Bottom Details Row */}
        <div className="flex justify-between items-center self-stretch">
          {/* Text Container */}
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-gray-800 font-montserrat text-base ">{name}</h3>

            {/* Conditional Metadata: Tags or Last Updated Date */}
            {tags && tags.length > 0 ? (
              <div className="flex gap-1.5 mt-1">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={` px-2 py-0.5 rounded-full ${
                      tag.toLowerCase() === "inbound"
                        ? "bg-green-600 text-white-100 text-xs font-montserrat"
                        : "bg-secondary text-white-100 text-xs font-montserrat"
                    }`}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xb font-montserrat text-gray-700">
                Last updated: {lastUpdated}
              </span>
            )}
          </div>

          {/* Arrow Icon Wrapper */}
          <div className="flex h-10   p-[10px_8px] justify-center items-center gap-2 rounded-full bg-white-100  cursor-pointer group">
            {/* Dynamic background toggle depending on active state seen in UI */}
            <div
              className={`  ${tags ? "bg-white-100 text-[#0066cc]" : "text-gray-400"}`}>
              <img
                src={ArrowUpRightGrayIcon}
                alt="Arrow up right"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
