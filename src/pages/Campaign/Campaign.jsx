import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import plusIcon from "../../assets/Plus.svg";
import CsvIcon from "../../assets/FileCsv.svg";
import CampaignWidgets from "../../components/ui/CampaignWidgets";
import CampaignCard from "../../components/ui/CampaignCard";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import { Button } from "@mui/material";

const Campaign = () => {
  const navigate = useNavigate();

  // Track selected tab state
  const [activeTab, setActiveTab] = useState("Outbound");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const filterOptions = [
    { label: "Running", value: "Running" },
    { label: "Paused", value: "Paused" },
    { label: "Completed", value: "Completed" },
  ];

  // Target dataset arrays mapping directly to live views based on explicit image mockups
  const outboundCampaigns = [
    {
      id: 1,
      title: "Campaign 1",
      totalContacts: 100,
      created: "03/11/2025 08:23 AM",
      status: "Running",
    },
    {
      id: 2,
      title: "Campaign 1",
      totalContacts: 100,
      created: "03/11/2025 08:23 AM",
      status: "Running",
    },
    {
      id: 3,
      title: "Campaign 2",
      totalContacts: 100,
      created: "03/11/2025 08:23 AM",
      status: "Running",
    },
    {
      id: 4,
      title: "Campaign 3",
      totalContacts: 100,
      created: "03/11/2025 08:23 AM",
      status: "Running",
    },
    {
      id: 5,
      title: "Campaign 4",
      totalContacts: 100,
      created: "03/11/2025 08:23 AM",
      status: "Running",
    },
  ];

  const inboundCampaigns = [
    {
      id: 1,
      title: "Inbound General Queue",
      totalContacts: 450,
      created: "04/12/2025 09:15 AM",
      status: "Running",
    },
    {
      id: 2,
      title: "Support Routing Path",
      totalContacts: 210,
      created: "05/01/2025 10:00 AM",
      status: "Running",
    },
    {
      id: 3,
      title: "VIP Client Priority Gate",
      totalContacts: 85,
      created: "05/18/2025 11:45 AM",
      status: "Running",
    },
  ];

  // Select source list based on active tab state
  const activeDataList =
    activeTab === "Outbound" ? outboundCampaigns : inboundCampaigns;

  const actions = [
    {
      label: "Campaign",
      variant: "primary",
      onClick: () => navigate("/campaign/create"),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];

  const calculatedTotalContacts = activeDataList.reduce(
    (sum, item) => sum + item.totalContacts,
    0,
  );

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      {/* Page Heading Section */}
      <PageHeader title="Campaign" actions={actions} />

      {/* Campaign Analytical Statistics Widgets Cards */}

      <CampaignWidgets
        activeTab={activeTab}
        liveContactsCount={calculatedTotalContacts}
      />

      {/* --- Tab Navigation & Functional Control Bar Section --- */}
      <div className="flex justify-between items-center self-stretch w-full border-b border-gray-100 pb-2">
        {/* Left Side: Tabs Switchers Layout Area */}
        <div className="flex items-center gap-[24px]">
          {["Outbound", "Inbound"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-center font-['Montserrat'] text-base   ${
                activeTab === tab
                  ? "text-[#004A68] border-b-[3px] border-[#004A68]"
                  : "text-gray-700 text-xb"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Right Side: Filters & Core Functional Export Controls Layout Row */}
        <div className="flex items-center gap-3">
          <SearchAndFilter
            searchValue={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            filterValue={filterQuery}
            onFilterChange={(e) => setFilterQuery(e.target.value)}
            filterOptions={filterOptions}
          />

          {/* Figma Spec Export CSV Action Trigger Asset Layout */}
          <Button
            className=" !bg-[#F2F2F2] !hover:bg-gray-200 transition-colors !text-gray-700 !font-['Montserrat'] !text-sm !rounded-[16px] !px-4 !py-2"
            onClick={() =>
              console.log(
                "Exporting dynamic structured report layout process execution.",
              )
            }
            startIcon={<img src={CsvIcon} />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* --- Core Vertical Infinite Scrolling Frame Container Viewport Panel --- */}
      <div className="flex-1 w-full overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {activeDataList.map((campaignItem) => (
          /* Render single dynamic instance pass through to subcard matching dataset values arrays safely */
          <CampaignCard
            key={campaignItem.id}
            title={campaignItem.title}
            totalContacts={campaignItem.totalContacts}
            createdDate={campaignItem.created}
            status={campaignItem.status}
          />
        ))}

        {activeDataList.length === 0 && (
          <div className="text-center w-full py-12 font-['Montserrat'] text-gray-400 text-sm">
            No active records found inside this {activeTab} workspace scope.
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaign;
