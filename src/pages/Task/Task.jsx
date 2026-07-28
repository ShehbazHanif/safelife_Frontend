import { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "../../components/common/PageHeader";
import plusIcon from "../../assets/Plus.svg";
import { SearchAndFilter } from "../../components/common/SearchAndFilter";
import TaskWidgets from "../../components/ui/TaskWidgets";
import TicketModal from "../../components/ui/TicketModal";
import ArchivedTicketsModal from "../../components/ui/ArchivedTicketModel";
import apiService from "../../apiservices/ApiServices";
import { useLoader } from "../../contexts/LoaderContext";
import Snackbar from "../../components/common/Snackbar";

const TASK_COLUMNS = ["Open", "In Progress", "Resolved"];
const COLUMN_STATUS_MAP = {
  Open: "open",
  "In Progress": "in_progress",
  Resolved: "resolved",
};

const Task = () => {
  const { showLoader, hideLoader } = useLoader();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [archivedTicketsOpen, setArchivedTicketsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(TASK_COLUMNS[0]);

  const showPageSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const hidePageSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Debounce refs
  const searchDebounceRef = useRef(null);
  const filterDebounceRef = useRef(null);

  const ITEMS_PER_PAGE = 10;

  // tasks managed from API per status column
  const [columnTasks, setColumnTasks] = useState(() =>
    TASK_COLUMNS.reduce((accumulator, statusColumn) => {
      accumulator[statusColumn] = [];
      return accumulator;
    }, {}),
  );
  // console.log("columnTasks", columnTasks);
  const [columnTotalItems, setColumnTotalItems] = useState(() =>
    TASK_COLUMNS.reduce((accumulator, statusColumn) => {
      accumulator[statusColumn] = 0;
      return accumulator;
    }, {}),
  );

  const [columnPages, setColumnPages] = useState(() =>
    TASK_COLUMNS.reduce((accumulator, statusColumn) => {
      accumulator[statusColumn] = 1;
      return accumulator;
    }, {}),
  );
  const [columnPageSizes, setColumnPageSizes] = useState(() =>
    TASK_COLUMNS.reduce((accumulator, statusColumn) => {
      accumulator[statusColumn] = ITEMS_PER_PAGE;
      return accumulator;
    }, {}),
  );
  const [columnLoadingByStatus, setColumnLoadingByStatus] = useState(() =>
    TASK_COLUMNS.reduce((accumulator, statusColumn) => {
      accumulator[statusColumn] = false;
      return accumulator;
    }, {}),
  );
  // console.log("columnLoadingByStatus", columnLoadingByStatus);

  // departments managed from API
  const [departments, setDepartments] = useState([]);

  // const statusOptions = [
  //   { label: "Open", value: "Open" },
  //   { label: "In Progress", value: "In Progress" },
  //   { label: "Resolved", value: "Resolved" },
  // ];

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

  const fetchTasks = useCallback(
    async (
      statusColumn = null,
      overrideColumnPages = null,
      overrideColumnPageSizes = null,
      shouldShowLoader = true,
    ) => {
      const columnsToFetch = statusColumn ? [statusColumn] : TASK_COLUMNS;
      const shouldUseGlobalLoader = Boolean(shouldShowLoader && !statusColumn);

      if (shouldUseGlobalLoader) {
        showLoader();
      }

      try {
        const activePages = overrideColumnPages || columnPages;
        const activePageSizes = overrideColumnPageSizes || columnPageSizes;

        setColumnLoadingByStatus((prevLoading) => {
          // console.log("preLoading  ", prevLoading);

          const nextLoading = { ...prevLoading };
          // console.log("nextLoading before reset", nextLoading);
          columnsToFetch.forEach((columnName) => {
            nextLoading[columnName] = true;
          });
          // console.log("nextLoading  after", nextLoading);
          return nextLoading;
        });

        await Promise.all(
          columnsToFetch.map(async (columnName) => {
            // if (columnName === "In Progress") {
            //   await new Promise((resolve) => setTimeout(resolve, 10000));
            // }
            const resp = await apiService.getTasks({
              page: activePages[columnName] || 1,
              limit: activePageSizes[columnName] || ITEMS_PER_PAGE,
              search: debouncedSearch || undefined,
              status: COLUMN_STATUS_MAP[columnName],
              priority: debouncedFilters.priority || undefined,
              departmentName: debouncedFilters.department || undefined,
            });

            setColumnTasks((prevTasks) => ({
              ...prevTasks,
              [columnName]: resp.tasks || [],
            }));
            setColumnTotalItems((prevTotals) => ({
              ...prevTotals,
              [columnName]: resp.total || (resp.tasks ? resp.tasks.length : 0),
            }));

            // setColumnLoadingByStatus((prevLoading) => ({
            //   ...prevLoading,
            //   [columnName]: false,
            // }));
          }),
        );
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setColumnLoadingByStatus((prevLoading) => {
          // console.log("prevLoading before reset", prevLoading);
          const nextLoading = { ...prevLoading };
          // console.log("nextLoading before reset", nextLoading);
          columnsToFetch.forEach((columnName) => {
            nextLoading[columnName] = false;
          });
          // console.log("nextLoading after reset", nextLoading);
          return nextLoading;
        });

        if (shouldUseGlobalLoader) {
          hideLoader();
        }
      }
    },
    [
      columnPages,
      columnPageSizes,
      debouncedSearch,
      debouncedFilters,
      // showLoader,
      // hideLoader,
    ],
  );

  // Debounce search changes (500ms delay)
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchValue]);

  const isMountRef = useRef(true);

  useEffect(() => {
    if (isMountRef.current) return;
    if (filterDebounceRef.current) clearTimeout(filterDebounceRef.current);
    filterDebounceRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => clearTimeout(filterDebounceRef.current);
  }, [filters]);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const isFirstFilterRun = useRef(true);
  useEffect(() => {
    if (isFirstFilterRun.current) {
      isFirstFilterRun.current = false;
      return;
    }
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, debouncedFilters]);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      console.log("Fetching departments... in task file");
      showLoader();
      try {
        const deps = await apiService.getDepartments();
        setDepartments(deps || []);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      } finally {
        hideLoader();
      }
    };
    fetchDepartments();
  }, []);

  const handleCreateTask = useCallback(
    async (payload) => {
      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
          return {};
        }
      })();

      const actorId = user?.userId || user?.id;
      if (!actorId) {
        console.error("Unable to identify logged-in user for task creation");
        showPageSnackbar("Unable to identify logged-in user", "error");
        return false;
      }

      const assignedTo = Array.isArray(payload?.assignedTo)
        ? payload.assignedTo
        : Array.isArray(payload?.assignees)
          ? payload.assignees.map((item) => item?.id || item).filter(Boolean)
          : [];

      const normalizedComments = Array.isArray(payload?.comments)
        ? payload.comments
            .map((comment) => {
              const text = comment?.text || comment?.content || "";
              if (!text?.trim()) return null;
              return {
                userId: actorId,
                content: text.trim(),
              };
            })
            .filter(Boolean)
        : [];

      const createPayload = {
        title: payload?.title || "",
        description: payload?.description || "",
        priority: payload?.priority || "normal",
        dueDate: payload?.dueDate || null,
        status: payload?.status || "open",
        assignedTo,
        createdBy: actorId,
        callerPhoneNumber: payload?.callerPhoneNumber || "",
        patientPhoneNumber: payload?.patientPhoneNumber || "",
        patientName: payload?.patientName || "",
        patientDob: payload?.patientDob || "",
        patientAddress: payload?.patientAddress || "",
        patientState: payload?.patientState || "",
        patientZipCode: payload?.patientZipCode || "",
        comments: normalizedComments,
      };

      showLoader();
      try {
        await apiService.createTask(createPayload);
        setCreateModalOpen(false);
        showPageSnackbar("Task created successfully");
        await fetchTasks();
        return true;
      } catch (err) {
        console.error("Failed to create task:", err);
        showPageSnackbar("Failed to create task", "error");
        return false;
      } finally {
        hideLoader();
      }
    },
    [fetchTasks, showLoader, hideLoader, showPageSnackbar],
  );

  const handleTaskStatusChange = (taskId, newStatus) => {
    const statusLabel =
      {
        open: "Open",
        in_progress: "In Progress",
        resolved: "Resolved",
        archived: "Archived",
      }[newStatus] || newStatus;

    setColumnTasks((prevTasksByColumn) => {
      const updatedTasksByColumn = {};

      TASK_COLUMNS.forEach((statusColumn) => {
        updatedTasksByColumn[statusColumn] = (
          prevTasksByColumn[statusColumn] || []
        ).map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        );
      });

      return updatedTasksByColumn;
    });

    (async () => {
      showLoader();
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const actorId = user?.userId || user?.id || null;
        await apiService.changeTaskStatus(taskId, actorId, newStatus);
        showPageSnackbar(`Task moved to ${statusLabel}`);
        await fetchTasks();
      } catch (err) {
        console.error("Failed to change task status:", err);
        showPageSnackbar("Failed to update task status", "error");
        await fetchTasks();
      } finally {
        hideLoader();
      }
    })();
  };

  const handleArchiveTask = useCallback(
    async (taskId) => {
      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
          return {};
        }
      })();

      const actorId = user?.userId || user?.id;
      if (!actorId) {
        showPageSnackbar("Unable to identify logged-in user", "error");
        return false;
      }

      showLoader();
      try {
        await apiService.archiveTask(taskId, actorId);
        showPageSnackbar("Ticket archived successfully");
        await fetchTasks();
        return true;
      } catch (err) {
        console.error("Failed to archive task:", err);
        showPageSnackbar("Failed to archive task", "error");
        return false;
      } finally {
        hideLoader();
      }
    },
    [fetchTasks, showLoader, hideLoader, showPageSnackbar],
  );

  const handlePageChange = useCallback(
    (statusColumn, value) => {
      const nextPages = {
        ...columnPages,
        [statusColumn]: value,
      };

      setColumnPages(nextPages);
      setActiveColumn(statusColumn);
      fetchTasks(statusColumn, nextPages, null, false);
    },
    [columnPages, fetchTasks],
  );

  const handlePageSizeChange = useCallback(
    (statusColumn, value) => {
      const nextLimit = Number(value);
      const nextPageSizes = {
        ...columnPageSizes,
        [statusColumn]: nextLimit,
      };
      console.log("nextPageSizes", nextPageSizes);
      const nextPages = {
        ...columnPages,
        [statusColumn]: 1,
      };

      setColumnPageSizes(nextPageSizes);
      setColumnPages(nextPages);
      setActiveColumn(statusColumn);
      fetchTasks(statusColumn, nextPages, nextPageSizes, false);
    },
    [columnPageSizes, columnPages, fetchTasks],
  );

  const handleTaskClick = (task) => {
    console.log("handleTaskClick called with task:", task);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // console.log("handleCloseModal called");
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const normalizeTicketStatus = (status) => {
    const normalized = String(status || "")
      .trim()
      .toLowerCase();

    if (normalized === "open" || normalized === "todo") return "Open";
    if (
      normalized === "in_progress" ||
      normalized === "in-progress" ||
      normalized === "in progress"
    )
      return "In Progress";
    if (
      normalized === "resolved" ||
      normalized === "done" ||
      normalized === "archived"
    )
      return "Resolved";

    return status || "Open";
  };
  const handleUpdateTask = useCallback(
    async (updatedTicket) => {
      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
          return {};
        }
      })();

      const actorId = user?.userId || user?.id;
      if (!actorId) {
        showPageSnackbar("Unable to identify logged-in user", "error");
        return false;
      }

      const apiStatus =
        COLUMN_STATUS_MAP[updatedTicket.status] || updatedTicket.status;

      const assignedTo = Array.isArray(updatedTicket.assignedTo)
        ? updatedTicket.assignedTo.map((d) => d?.id || d).filter(Boolean)
        : updatedTicket.assignedTo?.id
          ? [updatedTicket.assignedTo.id]
          : [];

      // Figure out which column this task currently lives in, before anything changes
      let oldStatus = null;
      for (const [statusKey, tasks] of Object.entries(columnTasks)) {
        if (tasks.some((t) => String(t.id) === String(updatedTicket.id))) {
          oldStatus = statusKey;
          break;
        }
      }

      showLoader();
      try {
        const savedTask = await apiService.updateTask(updatedTicket.id, {
          actorId,
          title: updatedTicket.title || "",
          status: apiStatus,
          priority: updatedTicket.priority || "",
          dueDate: updatedTicket.dueDate || null,
          description: updatedTicket.description || "",
          callerPhoneNumber: updatedTicket.callerPhoneNumber || "",
          patientPhoneNumber: updatedTicket.patientPhoneNumber || "",
          patientName: updatedTicket.patientName || "",
          patientDob: updatedTicket.patientDob || "",
          patientAddress: updatedTicket.patientAddress || "",
          patientState: updatedTicket.patientState || "",
          patientZipCode: updatedTicket.patientZipCode || "",
          assignedTo,
        });

        // Merge server response over what we sent, so we keep any fields
        // (like createdAt/updatedAt) the API returns
        const finalTask = {
          ...updatedTicket,
          ...(savedTask?.data || savedTask),
        };
        const newStatus = normalizeTicketStatus(finalTask.status); // must match your column keys: "Open" | "In Progress" | "Resolved"

        setColumnTasks((prev) => {
          const next = { ...prev };

          if (oldStatus) {
            next[oldStatus] = (next[oldStatus] || []).filter(
              (t) => String(t.id) !== String(finalTask.id),
            );
          }

          const existing = next[newStatus] || [];
          const alreadyThere = existing.some(
            (t) => String(t.id) === String(finalTask.id),
          );
          next[newStatus] = alreadyThere
            ? existing.map((t) =>
                String(t.id) === String(finalTask.id) ? finalTask : t,
              )
            : [finalTask, ...existing];

          return next;
        });

        // Keep pagination totals correct without a refetch
        if (oldStatus && oldStatus !== newStatus) {
          setColumnTotalItems((prev) => ({
            ...prev,
            [oldStatus]: Math.max(0, (prev[oldStatus] || 0) - 1),
            [newStatus]: (prev[newStatus] || 0) + 1,
          }));
        }

        return true;
      } catch (err) {
        console.error("Failed to update task:", err);
        showPageSnackbar(err?.message || "Failed to update task", "error");
        return false;
      } finally {
        hideLoader();
      }
    },
    [columnTasks], // now depends on columnTasks since we read it to find oldStatus
  );
  // Build filter array for SearchAndFilter component
  const filterArray = [
    {
      placeholder: "Department",
      options: departmentOptions,
      value: filters.department,
      onChange: (value) => {
        const actualValue = value && value.target ? value.target.value : value;
        setFilters((prev) => ({
          ...prev,
          department: actualValue,
        }));
      },
    },
    {
      placeholder: "Priority",
      options: priorityOptions,
      value: filters.priority,
      onChange: (value) => {
        const actualValue = value && value.target ? value.target.value : value;
        setFilters((prev) => ({
          ...prev,
          priority: actualValue,
        }));
      },
    },
  ];
  const actions = [
    {
      label: "Create Task",
      variant: "primary",
      onClick: () => setCreateModalOpen(true),
      startIcon: <img src={plusIcon} alt="" className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex h-full px-2 pb-4 flex-col items-start gap-4 self-stretch overflow-hidden">
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={3000}
        onClose={hidePageSnackbar}
      />

      <PageHeader
        title="Tasks"
        actions={actions}
        rightActions={
          <SearchAndFilter
            searchValue={searchValue}
            onSearchChange={(e) => {
              setSearchValue(e.target.value);
            }}
            filter={filterArray}
          />
        }
      />

      <div className="w-full overflow-y-auto flex-1 rounded-lg border border-gray-300 p-4">
        <div className="w-full flex flex-col items-end gap-2 py-3 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <button
              type="button"
              className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold transition shadow-sm hover:border-[#E5E5E5]`}
              onClick={() => setArchivedTicketsOpen(true)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F0F4] text-[#004A68]">
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
              <span>Archived Tickets</span>
            </button>
          </div>
        </div>

        <TaskWidgets
          displayedTasksByStatus={columnTasks}
          columnTotalItemsByStatus={columnTotalItems}
          columnPageNumbers={columnPages}
          columnPageSizeByStatus={columnPageSizes}
          onTaskClick={handleTaskClick}
          onTaskStatusChange={handleTaskStatusChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          activeColumn={activeColumn}
          onColumnSelect={setActiveColumn}
          columnLoadingByStatus={columnLoadingByStatus}
        />
      </div>

      <TicketModal
        mode="edit"
        open={isModalOpen}
        onClose={handleCloseModal}
        ticket={selectedTask}
        onDelete={handleArchiveTask}
        onSubmit={handleUpdateTask}
      />
      <TicketModal
        mode="create"
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
      <ArchivedTicketsModal
        open={archivedTicketsOpen}
        onClose={() => setArchivedTicketsOpen(false)}
      />
    </div>
  );
};

export default Task;
