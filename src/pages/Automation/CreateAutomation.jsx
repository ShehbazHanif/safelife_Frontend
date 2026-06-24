import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgCanvasImage from "../../assets/Automation.png";
import ChevronRightIcon from "../../assets/Chevronright.svg";
import Button from "../../components/common/Button";
import NodeModal from "../../components/ui/NodeModel";
// Reusable Node Card built strictly according to your Figma specs
const NodeCard = ({
  title,
  type,
  description,
  iconColor,
  iconBg,
  children,
}) => {
  return (
    <div className="flex w-[350px] flex-col items-start rounded-[16px] border border-[#E5E5E5] bg-white-100 shadow-[0_1px_4px_0_rgba(128,189,209,0.10)] font-['Montserrat'] overflow-hidden">
      {/* Card Header Row */}
      <div className="flex justify-between items-center w-full p-4 border-b border-[#F5F5F5]">
        <div className="flex items-center gap-3">
          {/* Node Custom Dynamic Icon Wrapper */}
          <div
            className={`flex w-8 h-8 items-center justify-center rounded-lg ${iconBg}`}>
            {children}
          </div>
          <span className="text-[#262626] text-[16px] font-semibold">
            {title}
          </span>
        </div>
        <span className="text-[#737373] text-[12px] font-medium">{type}</span>
      </div>

      {/* Card Body content */}
      <div className="p-4 w-full">
        <p className="text-[#737373] text-[14px] font-normal leading-[150%]">
          {description}
        </p>
      </div>
    </div>
  );
};

const CreateAutomation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    navigate("/automations");
  };

  return (
    <div className="flex h-full px-4 pb-4 flex-col items-start bg-white overflow-hidden gap-4 w-full">
      <div className="flex justify-between items-center self-stretch pt-2">
        {/* Left Side: Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span
            className="text-gray-700 text-xl font-montserrat cursor-pointer"
            onClick={() => navigate("/automations")}>
            Automation
          </span>

          <img src={ChevronRightIcon} alt=">" className="w-3 h-3" />
          <span className="text-gray-800 text-xl font-montserrat">
            Create new automation
          </span>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            className="px-5 py-2 !bg-[#004A68] !text-white hover:!bg-[#3CAFAA] text-white text-sm font-medium rounded-full transition-colors"
            onClick={() => console.log("Saved Clicked")}>
            Saved
          </Button>

          <Button
            onClick={handleCreate}
            className="gap-2 px-4 py-2 !bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] text-sm font-montserrat rounded-full transition-colors">
            Shared
          </Button>
          <Button
            onClick={handleCreate}
            className="px-5 py-2 !bg-[#004A68] !text-white hover:!bg-[#3CAFAA] text-white text-sm font-medium rounded-full transition-colors">
            Send Call
          </Button>
        </div>
      </div>

      {/* --- BACKGROUND IMAGE CANVAS WORKSPACE BOX --- */}
      <div
        className="flex-1 w-full rounded-[24px] border border-gray-100 bg-cover bg-center bg-no-repeat p-6 overflow-auto relative flex flex-col items-center gap-12"
        style={{ backgroundImage: `url(${BgCanvasImage})` }}>
        {/* Floating Add Node Action Element Trigger */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            className="!bg-[#004A68] !text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium"
            onClick={() => setIsModalOpen(true)}>
            <span>+</span> Add Node
          </Button>
        </div>

        {/* Node Tree Flow Workspace Container Area */}
        <div className="flex flex-col items-center gap-16 mt-16 w-full">
          {/* 1. Root Element Node: Start */}
          <NodeCard
            title="Start"
            type="Default"
            description="Hey there, how are you doing today?"
            iconBg="bg-[#E6F4FA]">
            {/* Play triangle svg symbol */}
            <svg
              className="w-4 h-4 text-[#004A68]"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </NodeCard>

          {/* 2. Split Children Flow Row Layout */}
          <div className="flex flex-wrap gap-12 justify-center items-start w-full relative">
            {/* Node Element: End Call */}
            <div className="flex flex-col items-center gap-12">
              <span className="bg-white-100 border border-gray-200 text-xs px-2 py-0.5 rounded shadow-sm font-medium text-gray-800">
                greeted
              </span>
              <NodeCard
                title="End Call"
                type="End Call"
                description="Click 'Add New Node' on the right to add a new node"
                iconBg="bg-[#FEE2E2]">
                {/* Phone handset off icon */}
                <svg
                  className="w-4 h-4 text-[#EF4444]"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </NodeCard>
            </div>

            {/* Node Element: New Node */}
            <div className="flex flex-col items-center gap-12">
              <span className="bg-white-100 border border-gray-200 text-xs px-2 py-0.5 rounded shadow-sm font-medium text-gray-800">
                New Edge
              </span>
              <NodeCard
                title="New Node"
                type="Default"
                description="Select a node or edge and press backspace to remove it."
                iconBg="bg-[#E0F2FE]">
                {/* Custom dialer helper node icon */}
                <svg
                  className="w-4 h-4 text-[#0284C7]"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.01.24l-2.2 2.2a15.1 15.1 0 01-6.59-6.59l2.2-2.2a1 1 0 00.25-1.02A11.4 11.4 0 018.5 4c0-.56-.44-1-1-1H4c-.56 0-1 .44-1 1 0 9.39 7.61 17 17 17 .56 0 1-.44 1-1v-3.5c0-.56-.44-1-1-1z" />
                </svg>
              </NodeCard>
            </div>
          </div>
        </div>
      </div>
      <NodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CreateAutomation;
