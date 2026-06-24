import { useState } from "react";
import Select from "../Common/Select";
const options = ["All Statuses", "Critical", "High", "Medium", "Low"];
import userAvatar from "../../assets/UsersThree.svg";
import ChevronIcon from "../../assets/Chevron.svg?react";
const HomeTicketCard = ({ tickets = [] }) => {
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6  flex-1 self-stretch rounded-2xl sm:rounded-3xl bg-gray-200 shadow-sm">
      {/* Header - Inner Div 1 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3 sm:gap-0">
        {/* Left side - Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-base  font-montserrat text-gray-800 ">
            Recent Tickets
          </h2>

          <span className="text-xs sm:text-xb bg-blue-100 text-blue-200 px-3 py-1 rounded-[16px]  font-montserrat">
            {tickets.length} Open
          </span>
        </div>

        {/* Right side - Filter */}
        <div className="flex items-center gap-2 w-full  sm:w-auto min-w-0">
          <label className="text-sm  text-[#2F3941] font-montserrat whitespace-nowrap">
            Filter by
          </label>
          <Select
            options={options}
            optionValue="value"
            optionLabel="label"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            icon={ChevronIcon}
          />
        </div>
      </div>

      {/* Tickets Container - Inner Div 2 (mapped) */}
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-2 sm:gap-3 p-4 sm:p-6 w-full rounded-2xl sm:rounded-3xl border border-gray-300 bg-white-100 shadow-sm">
          {/* Header  */}
          <div className="flex flex-col sm:flex-row  sm:items-start  gap-2 ">
            <div className="flex items-center gap-1">
              <span className="px-2 sm:px-3 py-1 rounded-[16px] text-xb font-montserrat w-fit bg-blue-100 text-blue-200">
                Open
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 sm:px-3 py-1 rounded-[16px] text-xb font-montserrat w-fit ${
                  ticket.status === "Critical"
                    ? "bg-red-100 text-red-500"
                    : ticket.status === "High"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                }`}>
                {ticket.status}
              </span>
            </div>
          </div>

          {/* Ticket Title with ID */}
          <div className="flex flex-col gap-2 items-start md:flex-row  md:w-[850px] md:gap-2">
            <div className="flex flex-col gap-1">
              <h3 className="text-base  text-gray-800 font-montserrat line-clamp-2">
                {ticket.title}
              </h3>

              {/* Ticket Description */}
              <p className="text-xs sm:text-xb text-gray-700 font-montserrat  ">
                {ticket.description}
              </p>
            </div>
            <p className="text-xs sm:text-xb text-gray-800 font-medium whitespace-nowrap">
              {ticket.para}
            </p>
          </div>

          {/* Footer - Department and Assignee with Badge */}
          <div className="flex  flex-col md:items-center md:flex-row justify-between w-full  ">
            {/* Left: Department, Assignee */}
            <div className="flex flex-col items-start md:flex-row md:items-center gap-3">
              {/* Department Icon and Label */}
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 flex items-center justify-center text-xs  text-gray-700">
                  <img src={userAvatar} alt="Department" />
                </div>
                <span className="text-xs sm:text-sm text-gray-800 font-montserrat">
                  {ticket.department || "Patient Care"}
                </span>
              </div>

              {/* Assignee Avatar and Name */}
              <div className="flex items-center gap-2">
                {ticket.avatar ? (
                  <img
                    src={ticket.avatar}
                    alt={ticket.assignee}
                    className="w-6 h-6 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-semibold">
                    {ticket.assignee?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs sm:text-sm font-montserrat text-gray-800">
                  {ticket.assignee}
                </span>
              </div>
            </div>

            {/* Right: Open Badge */}
            <span className="text-xs sm:text-xb text-gray-700 font-montserrat sm:text-right">
              {ticket.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeTicketCard;
