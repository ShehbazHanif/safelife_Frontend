import React from "react";
import ChevronRightIcon from "../../assets/Chevronright.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const CreateCampaignHeader = ({ currentStep, onBack, onNext, onLaunch }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center self-stretch w-full bg-white-100 pt-2">
      {/* Breadcrumb Navigation Label */}
      <div className="flex items-center gap-1 font-montserrat text-xl text-gray-700">
        <span onClick={() => navigate("/campaigns")}>Campaign</span>
        <img src={ChevronRightIcon} alt=">" className="w-3 h-3" />
        <span className="text-gray-800 ">Create Outbound Campaign</span>
      </div>

      {/* Primary Context Action Triggers */}
      <div className="flex items-center gap-3">
        {currentStep > 1 && (
          <Button
            onClick={onBack}
            className="px-[20px] py-[10px] rounded-[100px] border border-gray-200 font-montserrat text-sm  bg-white transition-all !bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB]">
            Back
          </Button>
        )}

        {currentStep < 4 ? (
          <Button
            onClick={onNext}
            className="px-[24px] py-[10px] rounded-[100px] bg-[#004A68] text-white font-['Montserrat'] text-sm font-semibold hover:bg-[#00364d] transition-all">
            Next
          </Button>
        ) : (
          <Button
            onClick={onLaunch}
            className="px-[24px] py-[10px] rounded-[100px] bg-[#004A68] text-white font-['Montserrat'] text-sm font-semibold hover:bg-[#00364d] transition-all shadow-md">
            Launch
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateCampaignHeader;
