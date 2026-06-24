import React from "react";
import ChevronRightIcon from "../../assets/Chevronright.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import PermissionsConfigViews from "../../components/ui/PermissionsConfigView";
const Role = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full  px-4 pb-4 flex-col items-start bg-white overflow-hidden gap-4">
      <div className="flex justify-between items-center self-stretch w-full bg-white-100 pt-2">
        {/* Breadcrumb Navigation Label */}
        <div className="flex items-center gap-1 font-montserrat text-xl text-gray-700">
          <span onClick={() => navigate("/users")}>Role & Permission</span>
          <img src={ChevronRightIcon} alt=">" className="w-3 h-3" />
          <span className="text-gray-800 ">Create New Role</span>
        </div>

        {/* Primary Context Action Triggers */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/users")}
            className="px-[24px] py-[10px] rounded-[100px] bg-[#004A68] text-white font-['Montserrat'] text-sm font-semibold hover:bg-[#00364d] transition-all">
            Create
          </Button>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        <PermissionsConfigViews />
      </div>
    </div>
  );
};

export default Role;
