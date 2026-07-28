import { Modal } from "../common/Modal";
import CustomSelect from "../common/Select";
import { CustomSearchBar } from "../common/CustomSearch";
import CustomButton from "../common/Button";
import Snackbar from "../common/Snackbar";
import { useCallback, useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";
import apiService from "../../apiservices/ApiServices";
import { useLoader } from "../../contexts/LoaderContext";
const ArchivedTicketModal = ({
  open = false,
  onClose,
  archivedModalOpen,
  setArchivedModalOpen,
}) => {
  const { showLoader, hideLoader } = useLoader();
  const [archivedSearch, setArchivedSearch] = useState("");
  const [archivedFilters, setArchivedFilters] = useState({
    assignedTo: "",
    priority: "",
  });
  const [archivedPage, setArchivedPage] = useState(1);
  const [archivedLimit, setArchivedLimit] = useState(10);
  const [archivedTotalPages, setArchivedTotalPages] = useState(1);
  const [archivedLoading, setArchivedLoading] = useState(false);
  const [archivedError, setArchivedError] = useState(null);
  const [archivedTickets, setArchivedTickets] = useState([]);
  const [archivedSnackbar, setArchivedSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    priority: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState({
    department: "",
    priority: "",
  });

  const searchDebounceRef = useRef(null);
  const filterDebounceRef = useRef(null);
  const [departments, setDepartments] = useState([]);

  const priorityOptions = [
    { label: "All Priorities", value: "" },
    { label: "High", value: "high" },
    { label: "Normal", value: "normal" },
    { label: "Urgent", value: "urgent" },
  ];

  const departmentOptions = [
    { label: "All Departments", value: "" },
    ...departments.map((dept) => ({
      label: dept.name,
      value: dept.name,
    })),
  ];

  const isOpen = open ?? archivedModalOpen ?? false;

  const handleArchivedSearchChange = (value) => {
    setArchivedSearch(value);
    setArchivedPage(1);
  };

  const handleArchivedFilterChange = (field, value) => {
    setArchivedFilters((prev) => ({ ...prev, [field]: value }));
    setArchivedPage(1);
  };

  const showArchivedSnackbar = useCallback((message, severity = "success") => {
    setArchivedSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const hideArchivedSnackbar = useCallback(() => {
    setArchivedSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    if (setArchivedModalOpen) {
      setArchivedModalOpen(false);
    }
  };

  const loadArchivedTickets = useCallback(
    async ({
      page = 1,
      limit = archivedLimit,
      search = archivedSearch,
      departmentName = archivedFilters.assignedTo,
      priority = archivedFilters.priority,
    } = {}) => {
      setArchivedLoading(true);
      setArchivedError(null);
      showLoader();

      try {
        const response = await apiService.getArchivedTasks({
          page,
          limit,
          search,
          departmentName,
          priority,
        });

        setArchivedTickets(response?.tasks || []);
        setArchivedPage(response?.page || page);
        setArchivedTotalPages(response?.totalPages || 1);
      } catch (err) {
        console.error("Failed to load archived tickets", err);
        setArchivedError(err.message || "Failed to load archived tickets");
        setArchivedTickets([]);
      } finally {
        setArchivedLoading(false);
        hideLoader();
      }
    },
    [
      archivedLimit,
      archivedSearch,
      archivedFilters.assignedTo,
      archivedFilters.priority,
      showLoader,
      hideLoader,
    ],
  );

  const handleRecoverTicket = useCallback(
    async (ticketId) => {
      const currentUser = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
          return {};
        }
      })();

      const actorId = currentUser?.userId || currentUser?.id;
      if (!actorId) {
        setArchivedError("Unable to identify logged-in user");
        return;
      }

      try {
        setArchivedLoading(true);
        showLoader();
        await apiService.restoreTask(ticketId, actorId, "open");
        showArchivedSnackbar("Ticket restored successfully");
        await loadArchivedTickets({
          page: archivedPage,
          limit: archivedLimit,
          search: archivedSearch,
          departmentName: archivedFilters.assignedTo,
          priority: archivedFilters.priority,
        });
      } catch (err) {
        console.error("Failed to recover archived ticket", err);
        showArchivedSnackbar(
          err.message || "Failed to recover ticket",
          "error",
        );
        setArchivedError(err.message || "Failed to recover ticket");
      } finally {
        setArchivedLoading(false);
        hideLoader();
      }
    },
    [
      archivedPage,
      archivedLimit,
      archivedSearch,
      archivedFilters.assignedTo,
      archivedFilters.priority,
      loadArchivedTickets,
      showArchivedSnackbar,
      showLoader,
      hideLoader,
    ],
  );

  useEffect(() => {
    if (!isOpen) return;

    const fetchDepartments = async () => {
      try {
        console.log("Fetching departments for archived tickets...");
        const deps = await apiService.getDepartments();
        setDepartments(deps || []);
      } catch (err) {
        console.error("Failed to fetch departments for archived tickets", err);
      }
    };

    fetchDepartments();
    loadArchivedTickets({
      page: 1,
      limit: archivedLimit,
      search: archivedSearch,
      departmentName: archivedFilters.assignedTo,
      priority: archivedFilters.priority,
    });
  }, [
    isOpen,
    archivedLimit,
    archivedSearch,
    archivedFilters.assignedTo,
    archivedFilters.priority,
    loadArchivedTickets,
  ]);
  return (
    <>
      <Snackbar
        open={archivedSnackbar.open}
        message={archivedSnackbar.message}
        severity={archivedSnackbar.severity}
        autoHideDuration={3000}
        onClose={hideArchivedSnackbar}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F0F4] text-[#004A68]">
              <svg
                className="w-5 h-5 text-red-500 hover:text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-grey-900">
                Archived Tickets
              </p>
              <p className="text-xs text-grey-500">
                {archivedTickets.length} archived item
                {archivedTickets.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        }
        width="1020px"
        maxWidth="92vw"
        bodyClassName="h-[700px] flex flex-col overflow-hidden"
        hideFooter
        footerReplacement={
          <div className="flex justify-end gap-2">
            <CustomButton
              onClick={handleClose}
              backgroundColor="#F2F2F2"
              color="#737373">
              Close
            </CustomButton>
          </div>
        }>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="shrink-0 space-y-4 border-b border-grey-200 bg-white px-6 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <CustomSearchBar
                  type="text"
                  value={archivedSearch}
                  onChange={(e) => handleArchivedSearchChange(e.target.value)}
                  placeholder="Search archived tickets..."
                  className="w-full border border-grey-300 rounded-lg px-4 py-2 text-sm text-grey-700 outline-none focus:border-[#3CAFAA] focus:ring-1 focus:ring-[#3CAFAA]"
                />
              </div>
              <div className="flex gap-2">
                <CustomSelect
                  label=""
                  value={archivedFilters.assignedTo}
                  onChange={(event) =>
                    handleArchivedFilterChange("assignedTo", event.target.value)
                  }
                  options={departmentOptions}
                  placeholder="Assigned Department"
                  size="small"
                  // sx={{ minWidth: 170, maxWidth: 220, padding: 0, height: 38, borderRadius: 2 }}
                />

                <CustomSelect
                  label=""
                  value={archivedFilters.priority}
                  onChange={(event) =>
                    handleArchivedFilterChange("priority", event.target.value)
                  }
                  options={priorityOptions}
                  placeholder="Priority"
                  size="small"
                  // sx={{ minWidth: 140, maxWidth: 160, padding: 0, height: 38, borderRadius: 2 }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {archivedLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse rounded-2xl border border-grey-200 bg-grey-100 p-4">
                    <div className="h-4 w-1/2 rounded-full bg-grey-200 mb-3" />
                    <div className="h-3 w-3/4 rounded-full bg-grey-200 mb-4" />
                    <div className="flex gap-2">
                      <div className="h-8 w-20 rounded-full bg-grey-200" />
                      <div className="h-8 w-16 rounded-full bg-grey-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : archivedError ? (
              <div className="min-h-[240px] flex items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50">
                <p className="text-red-600 text-sm">{archivedError}</p>
              </div>
            ) : archivedTickets.length === 0 ? (
              <div className="min-h-[240px] flex items-center justify-center rounded-2xl border border-dashed border-grey-300 bg-grey-50">
                <p className="text-grey-500 text-sm">
                  No archived tickets found.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {archivedTickets.map((ticket) => {
                  const priorityConfig = {
                    normal: {
                      bg: "#E5E7EB",
                      color: "#374151",
                      label: "Normal",
                    },
                    low: { bg: "#E5E7EB", color: "#374151", label: "Normal" },
                    high: { bg: "#FEF3C7", color: "#92400E", label: "High" },
                    urgent: {
                      bg: "#FEE2E2",
                      color: "#991B1B",
                      label: "Urgent",
                    },
                  };
                  const cfg =
                    priorityConfig[ticket.priority] || priorityConfig.normal;
                  const assigneeName = Array.isArray(ticket.assignedTo)
                    ? ticket.assignedTo.map((d) => d.name).join(", ")
                    : ticket.assignedTo?.name || ticket.assignee || "";
                  const initials = assigneeName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={ticket.id}
                      className="bg-white rounded-[16px] p-4 border-2 border-[#e5e7eb] hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          {/* Priority badge */}
                          <div
                            className="rounded-full px-3 py-0.5 w-fit flex items-center gap-1.5"
                            style={{ backgroundColor: cfg.bg }}>
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: cfg.color }}
                            />
                            <span
                              className="text-xs font-semibold"
                              style={{ color: cfg.color }}>
                              {cfg.label}
                            </span>
                          </div>

                          {/* Recover button */}
                          <button
                            onClick={() => handleRecoverTicket(ticket.id)}
                            // disabled={!canUpdateTickets}
                            className="ml-2 px-3 py-1.5 rounded-lg bg-[#004A68] text-white-100 text-xs font-semibold hover:bg-[#003350] transition-colors"
                            title="Recover this ticket to Open status">
                            Recover
                          </button>
                        </div>
                        {/* Title */}
                        <p className="text-base font-[700] text-grey-800 leading-snug">
                          {ticket.title || "Untitled ticket"}
                        </p>

                        {/* Assignee info */}
                        {assigneeName && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-grey-600 font-medium">
                              {assigneeName}
                            </span>
                          </div>
                        )}

                        {/* Patient info */}
                        {ticket.patientName && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-grey-600 font-medium">
                              Patient: {ticket.patientName}
                            </span>
                          </div>
                        )}

                        <div className="h-[1px] bg-grey-400" />

                        {/* Footer: due date + comment count + assignee avatar + recover button */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-[500] text-grey-700">
                              {ticket.dueDate
                                ? `Due: ${ticket.dueDate}`
                                : "No date"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {ticket.commentCount > 0 && (
                              <span className="text-xs text-grey-500 font-medium">
                                💬 {ticket.commentCount}
                              </span>
                            )}
                            {/* Initials avatar */}
                            <div className="w-7 h-7 rounded-full bg-[#CFEFF6] flex items-center justify-center text-[10px] font-bold text-[#004A68]">
                              {initials || "?"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!archivedLoading && !archivedError && (
            <div className="shrink-0 border-t border-[#e5e7eb] bg-white px-6 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Typography className="text-grey-600 text-xs font-medium">
                  Page {archivedPage} of {archivedTotalPages}
                </Typography>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      loadArchivedTickets({
                        page: Math.max(1, archivedPage - 1),
                      })
                    }
                    disabled={archivedPage <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-grey-200 text-grey-700 disabled:opacity-40">
                    ‹
                  </button>
                  {Array.from({ length: archivedTotalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === archivedTotalPages ||
                        Math.abs(p - archivedPage) <= 2,
                    )
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((item, idx) =>
                      typeof item === "number" ? (
                        <button
                          key={item}
                          type="button"
                          onClick={() => loadArchivedTickets({ page: item })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${archivedPage === item ? "bg-[#004A68] text-white-100" : "bg-grey-200 text-grey-700"}`}>
                          {item}
                        </button>
                      ) : (
                        <span
                          key={`e-${idx}`}
                          className="text-grey-600 text-sm px-1">
                          {item}
                        </span>
                      ),
                    )}
                  <button
                    type="button"
                    onClick={() =>
                      loadArchivedTickets({
                        page: Math.min(archivedTotalPages, archivedPage + 1),
                      })
                    }
                    disabled={archivedPage >= archivedTotalPages}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-grey-200 text-grey-700 disabled:opacity-40">
                    ›
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Typography className="text-grey-600 text-xs font-medium whitespace-nowrap">
                    Rows per page:
                  </Typography>
                  <CustomSelect
                    label=""
                    value={archivedLimit}
                    onChange={(event) => {
                      const nextLimit = Number(event.target.value);
                      setArchivedLimit(nextLimit);
                      setArchivedPage(1);
                      loadArchivedTickets({
                        page: 1,
                        limit: nextLimit,
                        search: archivedSearch,
                        departmentName: archivedFilters.assignedTo,
                        priority: archivedFilters.priority,
                      });
                    }}
                    menuItems={[
                      { label: "10", value: 10 },
                      { label: "25", value: 25 },
                      { label: "50", value: 50 },
                      { label: "100", value: 100 },
                    ]}
                    size="small"
                    placeholder=""
                    sx={{
                      minWidth: 70,
                      maxWidth: 100,
                      padding: 0,
                      height: "30px",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ArchivedTicketModal;
