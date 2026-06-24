import { useState, useMemo } from "react";
import PageHeader from "../../components/common/PageHeader";
import ChevronIcon from "../../assets/CaretDown.svg";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import AgentCard from "../../components/ui/AgentCard";
import templateIcon from "../../assets/Rows.svg";
import { useNavigate } from "react-router-dom";
import TemplateModel from "../../components/ui/TemplatesModel";
import CustomPagination from "../../components/common/CustomPagination";

const Agent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  const agents = [
    {
      id: "15891977A4E2ED...",
      name: "AI Assistant 1",
      lastUpdated: "30/15/2025",
      tags: [],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "5891977A4E2ED...2",
      name: "AI Assistant 2",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "5891977A4E2ED...3",
      name: "AI Assistant 3",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "45891977A4E2ED...",
      name: "AI Assistant 4",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "55891977A4E2ED...",
      name: "AI Assistant 5",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "65891977A4E2ED...",
      name: "AI Assistant 6",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "75891977A4E2ED...",
      name: "AI Assistant 7",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "85891977A4E2ED...",
      name: "AI Assistant 8",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "95891977A4E2ED...",
      name: "AI Assistant 9",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "105891977A4E2ED...",
      name: "AI Assistant 10",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "115891977A4E2ED...",
      name: "AI Assistant 11",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "125891977A4E2ED...",
      name: "AI Assistant 12",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "135891977A4E2ED...",
      name: "AI Assistant 13",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "145891977A4E2ED...",
      name: "AI Assistant 14",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
    {
      id: "155891977A4E2ED...",
      name: "AI Assistant 15",
      tags: ["Inbound", "Outbound"],
      avatarUrl: "https://i.imgur.com/38N7bX7.png",
    },
  ];
  const filterOptions = [
    { label: "Inbound", value: "Inbound" },
    { label: "Outbound", value: "Outbound" },
  ];

  const TOTAL_ITEMS = agents.length;
  const ITEMS_PER_PAGE = 11; // Locked exactly at 11
  const pageCount = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  // Dynamically slice your array based on current active page
  const displayedAgents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return agents.slice(startIndex, endIndex);
  }, [currentPage, agents]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const actions = [
    {
      label: "Create Agent",
      variant: "primary",
      onClick: () => navigate("/agent/create"),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
    {
      label: "Browse Template",
      variant: "secondary",
      onClick: () => setIsModalOpen(true),
      startIcon: (
        <img
          src={templateIcon}
          alt="template"
          className="w-4 h-4 object-contain cursor-pointer"
        />
      ),
    },
  ];

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      <PageHeader
        title="Agent"
        actions={actions}
        rightActions={
          <SearchAndFilter
            searchValue={searchValue}
            onSearchChange={(e) => setSearchValue(e.target.value)}
            filterValue={filterValue}
            onFilterChange={(value) => {
              const actualValue =
                value && value.target ? value.target.value : value;
              setFilterValue(actualValue);
            }}
            filterOptions={filterOptions}
          />
        }
      />
      <TemplateModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Grid displays ONLY the calculated items for the current page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full rounded-[24px] overflow-y-auto flex-1">
        {displayedAgents.map((agent, index) => (
          <AgentCard key={index} {...agent} />
        ))}
      </div>

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

export default Agent;
