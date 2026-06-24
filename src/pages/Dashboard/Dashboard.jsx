import PageHeader from "../../components/common/PageHeader";
import HomeWidgets from "../../components/ui/HomeWidgets";
import HomeCard from "../../components/ui/HomeCard";
import HomeTicketCard from "../../components/ui/HomeTicketCard";

import ShieldCheckYellow from "../../assets/ShieldCheckYellow.svg";
import ShieldCheckGreen from "../../assets/ShieldCheckGreen.svg";

import { cardData } from "../../constants/Dashboard/cardData";
import { ticketsData } from "../../constants/Dashboard/ticketsData";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";

const Dashboard = () => {
  return (
    /* 1. Added h-full and overflow-hidden to the main container */
    <div className="flex h-full w-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      {/* This stays fixed because it is outside the scroll container */}
      <PageHeader title="Dashboard" />

      {/* 2. Scrollable wrapper for the widgets and cards */}
      <div className="flex-1 w-full overflow-y-auto pr-1 flex flex-col gap-4">
        <HomeWidgets />
        <HomeCard sections={cardData} />
        <HomeTicketCard tickets={ticketsData} />
      </div>
    </div>
  );
};

export default Dashboard;
