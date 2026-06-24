import React from "react";

const IntegrationCard = ({ title, description, logo }) => {
  return (
    <div className="flex w-full p-6 items-center gap-4 rounded-2xl border border-[#D4D4D4] bg-white shadow-[0_1px_4px_0_rgba(128,189,209,0.10)] font-['Montserrat'] transition-all hover:shadow-md">
      <div className="flex flex-col items-start gap-4 self-stretch w-full">
        {/* Integration Platform Logo Wrapper Box */}
        <div className="flex w-8 h-8 items-center justify-center rounded-lg overflow-hidden shrink-0">
          {logo ? (
            <img
              src={logo}
              alt={`${title} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            // Fallback UI text bubble placeholder when no static asset exists
            <div className="w-full h-full bg-[#FAFAFA] border border-[#F2F2F2] flex items-center justify-center text-[10px] font-bold text-[#68737D] rounded-lg">
              {title?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Text Copy Section Block Layout */}
        <div className="flex flex-col items-start gap-1 self-stretch">
          <h4 className="text-[#262626] text-[18px] font-semibold leading-[150%] tracking-tight">
            {title}
          </h4>
          <p className="text-[#737373] text-[14px] font-medium leading-[150%] line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;
