import ChevronIcon from "../../assets/Chevron.svg?react";
import searchIcon from "../../assets/search.svg";
import Input from "../common/Input";
import Select from "../common/Select";

export const SearchAndFilter = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-3 ">
      {/* 1. Reusable Input Container */}
      <div className="relative w-full sm:w-[400px] max-w-xs">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-4 w-4 shrink-0 items-center justify-center pointer-events-none z-10">
          <img src={searchIcon} alt="Search" className="w-4 h-4" />
        </div>

        <Input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={onSearchChange}
          className="!pl-9 !pr-3 !py-2.5 !border-[#D4D4D4] bg-[#FFF] font-montserrat text-[14px] font-normal leading-[150%] text-[#A3A3A3] placeholder-[#A3A3A3] focus:ring-0 focus:border-[#D4D4D4]"
        />
      </div>

      {/* 2. Reusable Select Component styled cleanly */}
      <Select
        options={filterOptions}
        value={filterValue}
        onChange={onFilterChange}
        icon={ChevronIcon}
        placeholder="Filter"
        className="flex items-center !min-w-[110px] !h-[43px] !rounded-[20px] !font-medium border border-[#D4D4D4] !bg-transparent hover:bg-gray-50 focus:outline-none font-montserrat text-sm text-gray-700 cursor-pointer focus:!border-2 focus:!border-primary"
      />
    </div>
  );
};
