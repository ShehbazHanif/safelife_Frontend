import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assumed since navigate is used in actions
import PageHeader from "../../components/common/PageHeader"; // Adjust paths as needed
import AutomationCard from "../../components/ui/AutomationCard";
import CustomPagination from "../../components/common/CustomPagination";
import plusIcon from "../../assets/Plus.svg"; // Adjust path to your plus asset

const Automation = () => {
  const navigate = useNavigate();

  // 1. Array of exactly 30 hardcoded automation objects with unique IDs
  const automations = [
    {
      id: "9d1f7062-6bb6-434a-9b1f-70626bb6434a",
      title: "New Automation",
      description:
        "rigger an assistant response whenever a phone number receives an inbound call routing configuration",
    },
    {
      id: "8c0e6951-5aa5-323b-8a0e-69515aa5323b",
      title: "Twilio Incoming Call Webhook",
      description:
        "Trigger an assistant response whenever a phone number receives an inbound call routing configuration.",
    },
    // Dynamically creating the remaining 28 mock elements to reach exactly 30 items
    ...Array.from({ length: 28 }, (_, index) => {
      const cardId = index + 3;
      return {
        id: `${cardId}d1f7062-6bb6-434a-9b1f-70626bb6434a`.slice(0, 36),
        title: `Automation Pipeline ${cardId}`,
        description:
          "A customized operational automation task configured to map workspace pipeline data values.",
      };
    }),
  ];

  const actions = [
    {
      label: "Automation",
      variant: "primary",
      onClick: () => navigate("/automation/create"),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];

  // 2. Pagination Configuration Setup
  const ITEMS_PER_PAGE = 6;
  const TOTAL_ITEMS = automations.length;
  const pageCount = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 3. Slice the data cleanly for the current page view state
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedAutomations = automations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex h-full px-4 pb-4 flex-col items-start bg-white overflow-hidden gap-4 w-full">
      {/* Top Page Action Header Area */}
      <PageHeader title="Automation" actions={actions} />

      {/* Grid displaying the exact items calculated for the current page slice */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full rounded-[24px] overflow-y-auto flex-1">
        {displayedAutomations.map((automation) => (
          <AutomationCard
            key={automation.id}
            id={automation.id}
            title={automation.title}
            description={automation.description}
          />
        ))}
      </div>

      {/* Pagination Controls Footer Area */}
      <CustomPagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={TOTAL_ITEMS}
      />
    </div>
  );
};

export default Automation;
