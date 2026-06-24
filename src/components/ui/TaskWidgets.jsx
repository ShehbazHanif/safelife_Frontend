import React from "react";

// REUSABLE SUB-COMPONENT FOR CAPSULE FILTERS (Matches image_ad254d.png layout spec rules)
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

  const currentStyle = getStyles(status);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 border w-full rounded-2xl ${currentStyle.border} ${currentStyle.bg}`}>
      <div className="flex items-center gap-1.5">
        {/* Figma Target Bullseye Asset */}
        <svg
          className={status === "Open" ? "text-[#737373]" : currentStyle.text}
          style={{ width: "16.89px", height: "16.89px" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
        <span className={`text-sm  font-montserrat ${currentStyle.text}`}>
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
  console.log("TaskWidgets received full props:", props);

  const { displayedTasks = [], onTaskClick } = props;

  console.log("TaskWidgets displayedTasks:", displayedTasks);
  console.log("TaskWidgets onTaskClick:", onTaskClick);
  console.log("TaskWidgets onTaskClick type:", typeof onTaskClick);

  if (!displayedTasks || displayedTasks.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-32 text-gray-500 font-montserrat">
        No tasks available
      </div>
    );
  }

  // Column Config Array - Splitting out the statuses to build column groupings
  const columns = ["Open", "In Progress", "Resolved"];

  const getPriorityBadgeColor = (priority) => {
    return priority === "High"
      ? "bg-[#B73838] text-[#FFF]" // Red accent to match Figma
      : "bg-[#F6D451] text-[#725204]"; // Yellow/Normal accent to match Figma
  };

  return (
    /* 3-Column Container Grid mapping directly to image_acbd29.png layout */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start w-full border-black">
      {displayedTasks.map((task) => {
        return (
          <div
            key={task.id}
            className="flex flex-col w-full min-w-0 gap-4 border-black"
            onClick={() => {
              console.log(
                "Clicked task:",
                task,
                "Calling onTaskClick:",
                onTaskClick,
              );
              onTaskClick(task);
            }}>
            {/* Header: Displays the exact 'count' string defined inside the task object */}
            <StatusPillBadge
              label={task.status} // Using the 'status' property from the task object for label
              count={task.count} // Directly using the 'count' property from the task object
              status={task.status}
            />

            <div
              key={`${task.id}`}
              // onClick={() => {
              //   console.log(
              //     "Clicked task:",
              //     task,
              //     "Calling onTaskClick:",
              //     onTaskClick,
              //   );
              //   onTaskClick(task);
              // }}
              className="flex flex-col justify-between border border-[#E5E5E5] rounded-2xl bg-white shadow-sm p-5  transition-all duration-200 min-h-[140px]  hover:border-[#D4D4D4]">
              <div className="flex flex-col gap-2.5 items-start w-full">
                <span
                  className={`px-2 py-0.5 rounded-[16px] text-xs  font-montserrat uppercase tracking-wider ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority}
                </span>
                <h3 className="text-base  font-montserrat text-gray-800 line-clamp-2 leading-snug">
                  {task.title}
                </h3>
              </div>

              <div className="flex justify-between items-center w-full pt-3 mt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-1.5 text-xb  font-montserrat text-gray-700">
                  {/* Clock/Calendar Minimal Vector Element */}
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{task.date}</span>
                </div>
                <div className="flex items-center justify-center w-7 h-7 rounded-full  text-xs overflow-hidden">
                  <img
                    src={task.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskWidgets;
