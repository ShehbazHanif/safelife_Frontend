import PageHeader from "../../components/common/PageHeader";
import AgentModel from "../../components/ui/AgentModel";
import { useState, useMemo, useRef } from "react";

import ChevronIcon from "../../assets/CaretDown.svg";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import AgentCard from "../../components/ui/AgentCard";
import templateIcon from "../../assets/Rows.svg";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "../../assets/Chevronright.svg";

// Assuming you are using Lucide icons or raw SVGs for the settings button
// Replace with your actual icon asset if you have one
import SettingsIcon from "../../assets/Faders.svg";
import Button from "../../components/common/Button";
import { AddPatientModal } from "../../components/ui/AddPatientModal";
import AdvancedSettingsModal from "../../components/ui/AdvancedSettingModel";

const CreateAgent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const agentModelRef = useRef(null);

  const handleCreate = async () => {
    // Validate the form before creating
    if (agentModelRef.current) {
      const isValid = await agentModelRef.current.validate();
      if (isValid) {
        console.log("Form is valid, creating agent...");
        // Handle agent creation here
      }
    }
  };

  return (
    <div className="flex h-full w-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      {/* --- Header Section (Matches your Image) --- */}
      <div className="flex justify-between items-center self-stretch pt-2 ">
        {/* Left Side: Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span
            className="text-gray-700 text-xl  font-montserrat cursor-pointer "
            onClick={() => navigate("/agents")}>
            Agents
          </span>

          <img src={ChevronRightIcon} alt=">" className="w-3 h-3" />
          <span className="text-gray-800 text-xl  font-montserrat">
            Create new agent
          </span>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            className="  gap-2 px-4 py-2 !bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB] text-sm font-montserrat rounded-full transition-colors"
            startIcon={
              <img src={SettingsIcon} alt="Settings" className="w-4 h-4" />
            }
            onClick={() => setIsModalOpen(true)}>
            Advanced Settings
          </Button>

          <Button
            onClick={handleCreate}
            className="px-5 py-2 !bg-[#004A68] !text-white hover:!bg-[#3CAFAA] text-white text-sm font-medium rounded-full transition-colors">
            Create
          </Button>
        </div>
      </div>

      {/* --- Scrollable Body Section --- */}
      <div className="flex-1 w-full overflow-y-auto pr-1">
        <AgentModel ref={agentModelRef} />
        <AdvancedSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default CreateAgent;
