//
import React, { useState } from "react";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CustomSelect from "../common/Select";
import { Typography, Skeleton } from "@mui/material";
import { Target, CircleDashed, CheckCircle } from "@phosphor-icons/react";

const PAGE_SIZE_OPTIONS = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];

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

const normalizeStatusForApi = (status) => {
  const normalized = String(status || "")
    .trim()
    .toLowerCase();

  if (normalized === "open" || normalized === "todo") return "open";
  if (
    normalized === "in progress" ||
    normalized === "in_progress" ||
    normalized === "in-progress"
  )
    return "in_progress";
  if (normalized === "resolved" || normalized === "done") return "resolved";
  if (normalized === "archived") return "archived";

  return normalized || "open";
};

// REUSABLE SUB-COMPONENT FOR CAPSULE FILTERS
const StatusPillBadge = ({ label, count, status }) => {
  const getStyles = (statusName) => {
    const configurations = {
      Open: {
        bg: "bg-[#F9F9F9]",
        text: "text-[#555555]",
        counterBg: "bg-[#737373]",
        border: "border-[#E5E7EB]",
      },
      "In Progress": {
        bg: "bg-[#FEF9E5]",
        text: "text-[#EAB308]",
        counterBg: "bg-[#EAB308]",
        border: "border-[#F6D451]",
      },
      Resolved: {
        bg: "bg-[#C2F2D2]",
        text: "text-[#599F76]",
        counterBg: "bg-[#599F76]",
        border: "border-[#73C992]",
      },
    };
    return configurations[statusName] || configurations.Open;
  };
  const getColumnIcon = (statusName) => {
    switch (statusName) {
      case "Open":
        return Target;
      case "In Progress":
        return CircleDashed;
      case "Resolved":
        return CheckCircle;
      default:
        return Target;
    }
  };

  const currentStyle = getStyles(status);

  const IconComponent = getColumnIcon(status);
  return (
    <div
      className={`flex items-center justify-between gap-2 px-4 py-3 border-2 w-full rounded-2xl ${currentStyle.border} ${currentStyle.bg}`}>
      <div className="flex items-center gap-1.5">
        {/* <svg
          className={status === "Open" ? "text-[#737373]" : currentStyle.text}
          style={{ width: "16.89px", height: "16.89px" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg> */}
        <IconComponent size={20} className={currentStyle.text} />
        <span
          className={`text-sm font-semibold font-montserrat ${currentStyle.text}`}>
          {label}
        </span>
      </div>
      <div
        className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-montserrat text-white-100 ${currentStyle.counterBg}`}>
        {count || "0"}
      </div>
    </div>
  );
};

const TaskWidgets = (props) => {
  const {
    displayedTasksByStatus = {},
    onTaskClick,
    onTaskStatusChange,
    columnTotalItemsByStatus = {},
    columnPageNumbers = {},
    columnPageSizeByStatus = {},
    columnLoadingByStatus = {},
    onPageChange,
    onPageSizeChange,
    loading = false,
    activeColumn,
    onColumnSelect,
  } = props;

  const columns = ["Open", "In Progress", "Resolved"];

  const normalizeColumnTasks = (statusColumn) => {
    const tasksForColumn = Array.isArray(displayedTasksByStatus[statusColumn])
      ? displayedTasksByStatus[statusColumn]
      : [];

    return tasksForColumn.map((ticket) => ({
      ...ticket,
      status: normalizeTicketStatus(ticket.status),
      assignee: Array.isArray(ticket.assignedTo)
        ? ticket.assignedTo.map((d) => d.name).join(", ")
        : ticket.assignedTo?.name || "",
      createdAt: ticket.createdAt
        ? new Date(Number(ticket.createdAt)).toLocaleString()
        : null,
      updatedAt: ticket.updatedAt
        ? new Date(Number(ticket.updatedAt)).toLocaleString()
        : null,
    }));
  };

  const handleColumnPageChange = (statusColumn, nextPage) => {
    onPageChange?.(statusColumn, nextPage);
  };

  const handleColumnPageSizeChange = (statusColumn, nextLimit) => {
    onPageSizeChange?.(statusColumn, nextLimit);
  };

  // Handle drag end event from react-beautiful-dnd
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside a droppable area, stop
    if (!destination) {
      console.log("Drop cancelled - no destination");
      return;
    }

    // If dropped in the same position, stop
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("Drop cancelled - same position");
      return;
    }

    const taskId = String(draggableId);
    const newStatus = destination.droppableId;
    const oldStatus = source.droppableId;
    const backendStatus = normalizeStatusForApi(newStatus);

    // Validate that task exists
    const task = Object.values(displayedTasksByStatus)
      .flat()
      .find((t) => String(t.id) === taskId);
    if (!task) {
      console.warn(`Task ${taskId} not found in displayedTasksByStatus`);
      return;
    }

    // Only update if status actually changed
    if (normalizeStatusForApi(task.status) !== backendStatus) {
      console.log(`Task ${taskId} moved from ${oldStatus} to ${newStatus}`);

      // Call the callback to update task status in parent component
      if (onTaskStatusChange) {
        onTaskStatusChange(taskId, backendStatus);
      }
    }
  };

  const getPriorityBadgeColor = (priority) => {
    return priority === "High"
      ? "bg-[#B73838] text-[#FFF]"
      : "bg-[#F6D451] text-[#725204]";
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start w-full h-[calc(100vh-220px)] min-h-[250px]">
        {columns.map((statusColumn) => {
          const columnTasks = normalizeColumnTasks(statusColumn);
          const currentColumnPage = columnPageNumbers[statusColumn] ?? 1;
          const currentColumnLimit = columnPageSizeByStatus[statusColumn] ?? 10;
          const columnTotalItems = columnTotalItemsByStatus[statusColumn] ?? 0;
          const currentColumnLoading = Boolean(
            columnLoadingByStatus[statusColumn],
          );
          // console.log("currentColumnLoading", currentColumnLoading);
          const safeTotalPages = Math.max(
            1,
            Math.ceil(columnTotalItems / currentColumnLimit) || 1,
          );
          const isActiveColumn = statusColumn === activeColumn;

          return (
            <Droppable droppableId={statusColumn} key={statusColumn}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={() => onColumnSelect?.(statusColumn)}
                  className={`flex flex-col h-full   rounded-[16px] border-2 border-[#e5e7eb]   p-3 gap-4 min-h-0 overflow-hidden transition-colors
                    
                  `}>
                  {/* COLUMN HEADER    */}
                  <StatusPillBadge
                    label={statusColumn}
                    count={columnTasks.length}
                    status={statusColumn}
                  />

                  {/* SCROLLABLE CARDS CONTAINER */}
                  <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 p-1 scrollbar">
                    {currentColumnLoading ? (
                      <div className="flex flex-col gap-3">
                        {Array.from({ length: 3 }).map((_, skeletonIndex) => (
                          <div
                            key={`${statusColumn}-loading-${skeletonIndex}`}
                            className="rounded-[16px] border-2 border-[#e5e7eb] p-4 shadow-sm">
                            <Skeleton
                              variant="rectangular"
                              width="45%"
                              height={20}
                              sx={{ borderRadius: "999px", mb: 2 }}
                            />
                            <Skeleton variant="text" width="95%" height={24} />
                            <Skeleton
                              variant="text"
                              width="70%"
                              height={18}
                              sx={{ mt: 1 }}
                            />
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={82}
                              sx={{ borderRadius: "12px", mt: 2 }}
                            />
                            <div className="flex items-center justify-between mt-3 gap-3">
                              <Skeleton
                                variant="text"
                                width="40%"
                                height={18}
                              />
                              <Skeleton
                                variant="circular"
                                width={28}
                                height={28}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : columnTasks.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-gray-400 text-xs font-montserrat">
                        No {statusColumn} tasks
                      </div>
                    ) : (
                      columnTasks.map((task, index) => {
                        const canUpdate = props.canUpdate ?? true;
                        const commentCount = parseInt(
                          task.commentCount || "0",
                          10,
                        );

                        const initials = task.assignee?.[0]?.name
                          ? task.assignee[0].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : task.title
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase();

                        const getPriorityConfig = (priority) => {
                          const priorityLower = String(priority).toLowerCase();
                          if (
                            priorityLower === "high" ||
                            priorityLower === "urgent"
                          ) {
                            return {
                              label: priorityLower.toUpperCase(),
                              color: "#B73838",
                              bg: "#FCE8E8",
                            };
                          }
                          return {
                            label: "NORMAL",
                            color: "#725204",
                            bg: "#F6D451",
                          };
                        };
                        const cfg = getPriorityConfig(task.priority);

                        const formatTimestamp = (ts) =>
                          ts || task.date || "Just now";
                        const formatDateOnly = (
                          dateStr,
                          fallback = "No date",
                        ) => dateStr || task.date || fallback;
                        const assigneeName = task.assignees?.[0]?.name || null;
                        const patientLocation = task.patientLocation || null;

                        return (
                          <Draggable
                            key={task.id}
                            draggableId={String(task.id)}
                            index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => {
                                  if (props.onTaskClick) {
                                    props.onTaskClick(task);
                                    return;
                                  }
                                  if (canUpdate) {
                                    props.onEdit?.(task);
                                  }
                                }}
                                className={`bg-white-100 rounded-[16px] p-4 hover:shadow-md transition-all border-2 border-[#e5e7eb] text-left ${
                                  canUpdate
                                    ? "cursor-grab active:cursor-grabbing"
                                    : "cursor-default"
                                }`}>
                                <div className="flex flex-col gap-3">
                                  <div
                                    className="rounded-full px-3 py-0.5 w-fit flex items-center gap-1.5"
                                    style={{ backgroundColor: cfg.bg }}>
                                    <span
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{ backgroundColor: cfg.color }}
                                    />
                                    <Typography
                                      className="text-xs font-semibold"
                                      style={{ color: cfg.color }}>
                                      {cfg.label}
                                    </Typography>
                                  </div>

                                  <Typography className="text-base font-[700] text-gray-800 leading-snug font-montserrat line-clamp-2">
                                    {task.title}
                                  </Typography>

                                  {assigneeName && (
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        {assigneeName}
                                      </Typography>
                                    </div>
                                  )}

                                  {task.patientName && (
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        {task.patientName}
                                      </Typography>
                                    </div>
                                  )}

                                  {task.patientDob && (
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        DOB: {formatDateOnly(task.patientDob)}
                                      </Typography>
                                    </div>
                                  )}

                                  {patientLocation && (
                                    <div className="flex items-start gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        {patientLocation}
                                      </Typography>
                                    </div>
                                  )}

                                  {task.patientPhoneNumber && (
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        Patient: {task.patientPhoneNumber}
                                      </Typography>
                                    </div>
                                  )}

                                  {task.callerPhoneNumber && (
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                      </svg>
                                      <Typography className="text-xs text-[#A3A3A3] font-medium font-montserrat">
                                        Caller: {task.callerPhoneNumber}
                                      </Typography>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 gap-1 rounded-lg bg-g px-3 py-2 border border-gray-100">
                                    <div className="flex items-center justify-between gap-3">
                                      <Typography className="text-[11px] text-[#A3A3A3] font-medium font-montserrat">
                                        Created At
                                      </Typography>
                                      <Typography className="text-[11px] text-gray-700 font-semibold text-right font-montserrat">
                                        {formatTimestamp(task.createdAt)}
                                      </Typography>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                      <Typography className="text-[11px] text-[#A3A3A3] font-medium font-montserrat">
                                        Updated At
                                      </Typography>
                                      <Typography className="text-[11px] text-gray-700 font-semibold text-right font-montserrat">
                                        {formatTimestamp(task.updatedAt)}
                                      </Typography>
                                    </div>
                                  </div>

                                  <div className="h-[1px] bg-gray-200 w-full my-1" />

                                  <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center gap-1.5">
                                      <svg
                                        className="w-3.5 h-3.5 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                      </svg>
                                      <Typography className="text-xs font-semibold text-gray-700 font-montserrat">
                                        {formatDateOnly(
                                          task.dueDate,
                                          "No date",
                                        )}
                                      </Typography>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {commentCount > 0 && (
                                        <span className="text-xs text-gray-500 font-semibold font-montserrat">
                                          💬 {commentCount}
                                        </span>
                                      )}

                                      {task.avatar ? (
                                        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
                                          <img
                                            src={task.avatar}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-7 h-7 rounded-full bg-[#CFEFF6] flex items-center justify-center text-[10px] font-bold text-[#004A68] font-montserrat shadow-sm">
                                          {initials || "?"}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })
                    )}
                    {provided.placeholder}
                  </div>

                  {/* COLUMN FOOTER */}
                  <div className="shrink-0 rounded-[12px] border border-[#e5e7eb] bg-white-100 p-3 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#A3A3A3] text-xs font-medium whitespace-nowrap">
                        Page {currentColumnPage} of {safeTotalPages}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleColumnPageChange(
                              statusColumn,
                              Math.max(1, currentColumnPage - 1),
                            )
                          }
                          disabled={
                            loading ||
                            currentColumnLoading ||
                            currentColumnPage <= 1
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-primary text-white-100 hover:bg-secondary disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-50 transition-colors text-sm">
                          &lt;
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleColumnPageChange(
                              statusColumn,
                              Math.min(safeTotalPages, currentColumnPage + 1),
                            )
                          }
                          disabled={
                            loading ||
                            currentColumnLoading ||
                            currentColumnPage >= safeTotalPages
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-primary text-white-100 hover:bg-secondary disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-50 transition-colors text-sm">
                          &gt;
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                      <span className="text-[#A3A3A3] text-[11px] font-medium whitespace-nowrap">
                        Rows
                      </span>
                      <CustomSelect
                        value={currentColumnLimit}
                        onChange={(event) =>
                          handleColumnPageSizeChange(
                            statusColumn,
                            event.target.value,
                          )
                        }
                        options={PAGE_SIZE_OPTIONS}
                        displayEmpty={false}
                        className="min-w-[60px]"
                        sx={{
                          minHeight: 32,
                          borderRadius: "8px",
                          fontSize: "12px",
                          padding: 0,
                          "& .MuiSelect-select": {
                            padding: "4px 8px",
                            minHeight: "unset",
                            fontSize: "12px",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskWidgets;
