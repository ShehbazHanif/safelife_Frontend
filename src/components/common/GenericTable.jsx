import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import CheckBox from "../common/CheckBox"; // Keeping your custom CheckBox component
import CustomPagination from "./CustomPagination";

const GenericTable = ({
  columns = [],
  showFooter = true,
  maxHeight = "320px",
  showCheckbox = false,
  selectedRows = new Set(),
  onRowSelect = null,
  onSelectAll = null,
  headerIcon = null, // Left for backwards compatibility, MUI TableSortLabel overrides this naturally
  actions = [],
}) => {
  // Ensure columns have items arrays
  const safeColumns = columns.map((col) => ({
    ...col,
    items: col.items || [],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const numRows = safeColumns[0]?.items?.length || 0;
  const isAllSelected = selectedRows.size === numRows && numRows > 0;

  const TOTAL_ITEMS = numRows;
  const ITEMS_PER_PAGE = 11; // Locked exactly at 11
  const pageCount = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSort = (columnId) => {
    if (sortColumn === columnId) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortOrder("asc");
    }
  };

  // 1. Pivot or sort columns into row-structured objects for standard table mapping
  const sortedAndFormattedRows = useMemo(() => {
    // Generate an array of row objects containing data from all columns
    let rowsData = Array.from({ length: TOTAL_ITEMS }).map((_, index) => {
      const rowObj = { id: index };
      safeColumns.forEach((col) => {
        rowObj[col.id] = col.items[index];
      });
      return rowObj;
    });

    if (!sortColumn) return rowsData;

    // Apply sorting logic on row representations
    return [...rowsData].sort((a, b) => {
      const valA =
        typeof a[sortColumn] === "object"
          ? a[sortColumn]?.role || ""
          : a[sortColumn];
      const valB =
        typeof b[sortColumn] === "object"
          ? b[sortColumn]?.role || ""
          : b[sortColumn];

      const numA = parseFloat(valA);
      const numB = parseFloat(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortOrder === "asc" ? numA - numB : numB - numA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      return sortOrder === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [safeColumns, sortColumn, sortOrder, TOTAL_ITEMS]);

  // 2. Paginate the built rows
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFormattedRows.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
  }, [sortedAndFormattedRows, currentPage]);

  return (
    <Paper
      className="font-['Montserrat'] bg-white w-full overflow-hidden"
      variant="outlined"
      sx={{ borderRadius: "16px", borderColor: "#D8DCDE" }}>
      {/* Scroll Wrapper */}
      <TableContainer sx={{ maxHeight: maxHeight, overflowY: "auto" }}>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="generic mui table">
          {/* Header */}
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#F2F2F2",
                  borderColor: "#D8DCDE",
                  py: "10px",
                  px: "10px",
                },
              }}>
              {showCheckbox && (
                <TableCell
                  padding="checkbox"
                  align="center"
                  sx={{ width: "48px" }}>
                  <CheckBox
                    checked={isAllSelected}
                    onChange={() => onSelectAll?.(!isAllSelected)}
                  />
                </TableCell>
              )}

              {safeColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ width: column.width || "180px" }}
                  sx={{
                    textTransform: "capitalize",
                    color: "#1F2937",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}>
                  <TableSortLabel
                    active={sortColumn === column.id}
                    direction={sortColumn === column.id ? sortOrder : "asc"}
                    onClick={() => handleSort(column.id)}>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              {actions.length > 0 && (
                <TableCell
                  sx={{
                    width: "150px",
                    fontWeight: 500,
                    color: "#1F2937",
                    fontSize: "14px",
                  }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {paginatedRows.map((row) => {
              const globalRowIndex = row.id;
              const isRowSelected =
                showCheckbox && selectedRows.has(globalRowIndex);

              return (
                <TableRow
                  key={globalRowIndex}
                  hover
                  selected={isRowSelected}
                  sx={{
                    height: "40px",
                    "& td": { borderColor: "#E9EBED", py: "8px", px: "12px" },
                    backgroundColor: isRowSelected
                      ? "#F9FAFB !important"
                      : "inherit",
                  }}>
                  {/* Checkbox Cell */}
                  {showCheckbox && (
                    <TableCell align="center">
                      <CheckBox
                        checked={isRowSelected}
                        onChange={() => onRowSelect?.(globalRowIndex)}
                      />
                    </TableCell>
                  )}

                  {/* Data Cells */}
                  {safeColumns.map((column) => {
                    const cellData = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.renderCell ? (
                          column.renderCell(cellData, globalRowIndex)
                        ) : (
                          <span className="text-[14px] font-normal font-montserrat text-gray-800 truncate block">
                            {cellData}
                          </span>
                        )}
                      </TableCell>
                    );
                  })}

                  {/* Actions Cell */}
                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {actions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            onClick={() => action.onClick(globalRowIndex)}
                            className={`text-sm font-medium transition-colors cursor-pointer ${
                              action.className ||
                              "text-blue-600 hover:text-blue-800"
                            }`}
                            type="button">
                            {action.icon ? action.icon : action.label}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer / Pagination */}
      {showFooter && (
        <CustomPagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          totalItems={TOTAL_ITEMS}
        />
      )}
    </Paper>
  );
};

export default GenericTable;
