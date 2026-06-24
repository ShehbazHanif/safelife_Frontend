import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import EditIcon from "../../assets/PencilSimple.svg";
import Profile from "../../components/ui/Profile";
import Security from "../../components/ui/Security";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    // Add your save logic here (e.g., API calls to save formData)
    console.log("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="flex h-full px-4 pb-4 flex-col items-start bg-white overflow-hidden gap-4">
      <PageHeader title="Account Settings" />

      {/* Tabs Nav */}
      <div className="flex items-center gap-[24px]">
        {["Profile", "Security"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsEditing(false); // Reset editing state when switching tabs
            }}
            className={`pb-2 px-1 text-center font-['Montserrat'] text-sm  ${
              activeTab === tab
                ? "text-[#004A68] border-b-[3px] border-[#004A68]"
                : "text-gray-700 text-xb"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Profile" ? (
        <>
          {/* Header Info & Dynamic Buttons */}
          <div className="flex justify-between items-center self-stretch">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl text-gray-800">My Profile</h2>
              <p className="text-[14px] font-normal leading-[150%] text-gray-700">
                Manage your profile settings and preferences.
              </p>
            </div>

            {/* Action Buttons Section */}
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  {/* Cancel Button */}
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="!bg-[#F2F2F2] !border !border-[#EAEAEA] !text-gray-800 hover:!bg-[#E5E7EB] h-10 px-4 text-[14px] font-semibold transition-all"
                  >
                    Cancel
                  </Button>

                  {/* Update Button */}
                  <Button
                    onClick={handleUpdate}
                    className="!bg-[#004A68] !text-white !border !border-[#004A68] hover:!bg-[#00354b] h-10 px-4 text-[14px] font-semibold transition-all"
                  >
                    Update
                  </Button>
                </>
              ) : (
                /* Static Edit Button */
                <Button
                  onClick={() => setIsEditing(true)}
                  className="!bg-[#F2F2F2] !border !border-[#EAEAEA] !text-gray-800 hover:!bg-[#E5E7EB] h-10 px-4 text-[14px] font-semibold transition-all"
                  startIcon={<img src={EditIcon} alt="Edit" className="w-4 h-4" />}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>

          <Profile isEditing={isEditing} />
        </>
      ) : (
        <Security />
      )}
    </div>
  );
};

export default Setting;