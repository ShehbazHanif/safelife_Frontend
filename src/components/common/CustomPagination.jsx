import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const CustomPagination = ({
  count = 10, // Total number of pages
  page = 1, // Current active page
  onChange, // Page change handler function
  itemsPerPage = 11, // Kept locked at 11
  totalItems = 105, // Total count of records
}) => {
  // Dynamically calculate the item range string safely using the fixed itemsPerPage
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    /* Exact layout container match from your design */
    <div className="flex self-stretch items-center justify-between bg-white px-3 py-2.5 border-t border-[#D8DCDE] w-full">
      {/* Left Label: Range Display */}
      <div className="text-center text-[14px] font-normal font-montserrat leading-[150%] text-gray-700">
        {totalItems > 0
          ? `${startItem}-${endItem} items shown`
          : "0 items shown"}
      </div>

      {/* Center Section: Pagination Controllers */}
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <>&lt;</>,
              next: () => <>&gt;</>,
            }}
            sx={{
              border: "none",
              backgroundColor: "primary", // Handled completely by Tailwind
              minWidth: "auto",
              "&.Mui-selected": {
                backgroundColor: "#004A68", // Handled completely by Tailwind
              },
              "&:hover": {
                backgroundColor: "#3CAFAA", // Handled completely by Tailwind
              },
            }}
            className={`flex h-8 w-8 items-center justify-center font-normal font-montserrat cursor-pointer transition-all text-[14px] ${
              item.type === "ellipsis"
                ? "text-[#737373]"
                : item.type === "previous" || item.type === "next"
                  ? "rounded-[4px] p-2 text-gray-400 !hover:bg-primary hover:rounded-[16px] hover:text-white-100"
                  : item.selected
                    ? "!rounded-full !bg-secondary !text-white-100" // Active styling matches requirements
                    : "text-white-100 !hover:bg-primary !hover:rounded-[16px] hover:text-white-100" // Hover styling matches requirements
            }`}
          />
        )}
      />

      {/* Right Label: Total Count Display */}
      <div className="text-[14px] font-normal font-montserrat text-gray-700">
        {totalItems} items total
      </div>
    </div>
  );
};

export default CustomPagination;
