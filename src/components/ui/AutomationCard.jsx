import React from "react";
import Button from "../common/Button";
const AutomationCard = ({ id, title, description }) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="flex ] p-4 flex-col items-start gap-4 rounded-2xl border border-[#F2F2F2] bg-[#F9F9F9] shadow-[0_1px_4px_0_rgba(128,189,209,0.10)] font-['Montserrat']">
      {/* Div 1: Header Row (ID Pill + Context Dot Button) */}
      <div className="flex justify-between items-center self-stretch">
        {/* ID Pill Token Layer */}
        <button
          onClick={handleCopyId}
          className="flexDoc flex padding py-1 px-2 justify-center items-center gap-2 rounded-[100px] border border-[#F2F2F2] bg-white-100 shadow-[0_2px_4px_0_rgba(115,115,115,0.10)] transition-colors hover:bg-gray-50 group">
          <span className="text-[#262626] text-[12px] font-medium leading-[150%] truncate max-w-[120px]">
            {id}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 aspect-square shrink-0 transition-transform group-active:scale-90"
            viewBox="0 0 16 16"
            fill="none">
            <path
              d="M11.5 4H2.5C2.36739 4 2.24021 4.05268 2.14645 4.14645C2.05268 4.24021 2 4.36739 2 4.5V13.5C2 13.6326 2.05268 13.7598 2.14645 13.8536C2.24021 13.9473 2.36739 14 2.5 14H11.5C11.6326 14 11.7598 13.9473 11.8536 13.8536C11.9473 13.7598 12 13.6326 12 13.5V4.5C12 4.36739 11.9473 4.24021 11.8536 4.14645C11.7598 4.05268 11.6326 4 11.5 4ZM11 13H3V5H11V13ZM14 2.5V11.5C14 11.6326 13.9473 11.7598 13.8536 11.8536C13.7598 11.9473 13.6326 12 13.5 12C13.3674 12 13.2402 11.9473 13.1464 11.8536C13.0527 11.7598 13 11.6326 13 11.5V3H4.5C4.36739 3 4.24021 2.94732 4.14645 2.85355C4.05268 2.75979 4 2.63261 4 2.5C4 2.36739 4.05268 2.24021 4.14645 2.14645C4.24021 2.05268 4.36739 2 4.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5Z"
              fill="#737373"
            />
          </svg>
        </button>

        {/* Options Context Action Trigger (...) */}
        <button className="flex p-2 justify-center items-center gap-2 rounded-[100px] w-8 h-8 text-[#737373] hover:bg-gray-200/50 transition-colors">
          <span className="block translate-y-[-4px] font-bold text-[14px]">
            ...
          </span>
        </button>
      </div>

      {/* Div 2: Content Block (Title & Description Text) */}
      <div className="flex pb-2.5 flex-col items-start gap-2 self-stretch border-b border-[#F2F2F2]">
        <h4 className="text-[#262626] text-[16px] font-semibold leading-[150%]">
          {title}
        </h4>
        <p className="text-[#737373] text-[14px] font-normal leading-[150%] line-clamp-2">
          {description}
        </p>
      </div>

      {/* Common Button Action Box */}

      <Button
        className="w-full"
        onClick={() => console.log(`Opening ${title}`)}>
        Open
      </Button>
    </div>
  );
};

export default AutomationCard;
