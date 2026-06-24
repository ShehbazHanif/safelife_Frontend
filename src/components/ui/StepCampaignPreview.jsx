import React from "react";
import CampaignVectorIcon from "../../assets/CampaignVector.svg";

const StepCampaignPreview = () => {
  const metricPreviews = [
    { label: "Total Contacts", value: "12" },
    { label: "Estimated Budget", value: "5 Credit" },
    { label: "Estimated Time", value: "5 Mins" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 text-center">
      {/* Central Vector Art Mock Element */}
      <div className="w-[180px] h-[140px] mb-6 flex flex-col items-center justify-center bg-gray-100 rounded-xl relative">
        <img
          src={CampaignVectorIcon}
          alt="Campaign Vector"
          className="w-full h-full p-4"
        />
      </div>

      <h3 className="text-gray-800 font-['Montserrat'] text-[20px] font-bold mb-8">
        You are about to start a Campaign
      </h3>

      {/* Metrics Center Content List Pillar */}
      <div className="w-full max-w-[540px] flex flex-col gap-4">
        {metricPreviews.map((metric, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 bg-white-100 rounded-[16px] border border-gray-100 shadow-sm transition-all hover:scale-[1.01]">
            <span className="text-gray-800 font-montserrat text-base ">
              {metric.label}
            </span>
            <span className="p-4 bg-[#CBEFFC] text-[#004A68] font-['Montserrat'] text-xs font-bold rounded-[16px]">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepCampaignPreview;
