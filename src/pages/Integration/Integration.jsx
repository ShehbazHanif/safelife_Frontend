import React, { useState } from "react";
import IntegrationCard from "../../components/ui/IntegrationCard";
import CustomPagination from "../../components/common/CustomPagination";
import PageHeader from "../../components/common/PageHeader";
const Integration = () => {
  // Hardcoded array containing exactly 30 integration objects
  const integrations = [
    {
      id: 1,
      title: "Twilio",
      description:
        "Connect your Twilio account and use directly your phone numbers with your assistants",
      logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%23F22F46'><rect width='32' height='32' rx='8'/><circle cx='11' cy='11' r='2.5' fill='white'/><circle cx='21' cy='11' r='2.5' fill='white'/><circle cx='11' cy='21' r='2.5' fill='white'/><circle cx='21' cy='21' r='2.5' fill='white'/></svg>",
    },
    {
      id: 2,
      title: "Kinnser",
      description: "Import your subaccounts from GHL",
      logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'><rect width='32' height='32' rx='8' fill='white' stroke='%23E5E7EB'/><path d='M8 22 l6-10 l5 7 l5-8 l4 11 Z' fill='%23004A68'/><path d='M14 12 l3 4 l4-5 l3 4 l-6 5 Z' fill='%23E25C3C'/></svg>",
    },
    // Dynamically creating items 3 to 30
    ...Array.from({ length: 28 }, (_, index) => {
      const cardId = index + 3;
      return {
        id: cardId,
        title: `Platform Service ${cardId}`,
        description:
          "Seamlessly connect sync endpoints, webhook pipelines, and customize workspace operational metadata filters natively.",
        logo: "",
      };
    }),
  ];

  // Pagination configuration setup variables
  const ITEMS_PER_PAGE = 6; // Adjust pagination limit per page view here
  const TOTAL_ITEMS = integrations.length;
  const pageCount = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate slices cleanly for the current view state
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedIntegrations = integrations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex h-full px-4 pb-4 flex-col items-start bg-white-100 overflow-hidden gap-4">
      <PageHeader title="Integration" />
      {/* Grid displays ONLY the calculated items for the current page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  overflow-y-auto flex-1">
        {displayedIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            title={integration.title}
            description={integration.description}
            logo={integration.logo}
          />
        ))}
      </div>

      {/* Pagination Controller Row Layout */}
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

export default Integration;
