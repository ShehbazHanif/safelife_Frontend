import React, { useState } from "react";
import { Modal } from "../common/Modal";
import avatar from "../../assets/avatar 1.png";
import ArrowUp from "../../assets/ArrowUp.svg";
import plusIcon from "../../assets/Plus.svg";

const TaskModel = ({ isOpen, onClose, task }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Laura Olmos",
      time: "10:52 AM",
      date: "Yesterday",
      text: "Lorem ipsum dolor sit amet consectetur. Senectus amet dictumst sit eu augue risus mauris facilisi pellentesque. Aliquam ac a diam.",
      avatar: avatar,
    },
    {
      id: 2,
      author: "Laura Olmos",
      time: "10:52 AM",
      date: "Yesterday",
      text: "Lorem ipsum dolor sit amet consectetur. Senectus amet dictumst sit eu augue risus mauris facilisi pellentesque. Aliquam ac a diam.",
      avatar: avatar,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const taskData = task || {
    title: "Set an appointment with Dr. Asad",
    priority: "High",
    status: "Open",
    date: "Dec 14 2025",
    assignees: [
      {
        name: "Laura Olmos",
        avatar: avatar,
      },
      {
        name: "Laura Olmos",
        avatar: avatar,
      },
    ],
  };

  const getPriorityColorClass = (priority) => {
    return priority === "High" ? "bg-[#EF4444]" : "bg-[#EAB308]";
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "Now",
        text: newComment,
        avatar: avatar,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskData?.status || "Open"}
      maxWidth="600px"
      titleStyle={{
        color: "#262626",
        fontFamily: "Montserrat",
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "150%",
      }}
      bodyStyle={{ backgroundColor: "#F9F9F9" }}
      footer={
        <div className="flex justify-between items-center w-full box-border px-1">
          <div className="flex w-full py-2 pl-5 pr-2 items-center gap-2.5 rounded-full border !border-[#D4D4D4] bg-white t focus:!border-2 focus:!border-primary focus-within:!border-2 focus-within:!border-primary ">
            <input
              type="text"
              placeholder="Write your message here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-none outline-none text-sm font-medium text-gray-800 bg-transparent placeholder-gray-400 font-montserrat"
            />
            <button
              type="button"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 text-white bg-[#004A68] hover:bg-[#003a52] cursor-pointer
                
                 

              `}>
              {/* <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="-rotate-90 aspect-square">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg> */}
              <img src={ArrowUp} className="w-4 h-4" />
            </button>
          </div>
        </div>
      }>
      {/* Task Title Block */}
      <div className="">
        <div>
          <h2 className="text-[#262626] text-2xl font-bold font-montserrat tracking-tight">
            {taskData?.title || "No Title Provided"}
          </h2>
        </div>

        {/* Meta Grid Layout */}
        <div className="flex flex-col gap-3.5 ">
          {/* Priority Badge Row */}
          <div className="grid grid-cols-[60px_1fr] items-center">
            <span className="text-[#A3A3A3] text-sm font-medium font-montserrat">
              Priority
            </span>
            <div>
              <div
                className={`inline-block px-3 py-0.5 rounded-full text-white-100 text-xs font-semibold ${getPriorityColorClass(taskData?.priority)}`}>
                {taskData?.priority || "Normal"}
              </div>
            </div>
          </div>

          {/* Assignees Row */}
          {/* Assignees Row */}
          <div className="grid grid-cols-[110px_1fr] items-center">
            <div className="flex items-center gap-2 text-[#A3A3A3]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M10 10c1.657 0 3-1.343 3-3S11.657 4 10 4s-3 1.343-3 3 1.343 3 3 3zm0 2c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
              </svg>
              <span className="text-sm font-medium font-montserrat">
                Assignees
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {(taskData?.assignees || []).map((assignee, index) => {
                // 1. Determine the name and avatar safely regardless of data format
                const isObject = assignee && typeof assignee === "object";
                const name = isObject ? assignee.name : assignee;
                const avatarUrl =
                  isObject && assignee.avatar
                    ? assignee.avatar
                    : `https://i.avatar.iran.liara.run/username?username=${encodeURIComponent(name || "User")}`;

                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1.5 py-1 pl-1.5 pr-3 rounded-full bg-[#F2F2F2]">
                    <img
                      src={avatarUrl}
                      alt={name || "Assignee"}
                      className="w-6 h-6 aspect-square rounded-full object-cover"
                    />
                    <span className="text-[#262626] text-xs font-semibold font-montserrat">
                      {name || "Unknown"}
                    </span>
                  </div>
                );
              })}

              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center bg-[#F2F2F2] hover:bg-gray-200 rounded-full text-gray-500 transition-colors text-sm font-medium">
                <img src={plusIcon} className="w-3" />
              </button>
            </div>
          </div>

          {/* Due Date Row */}
          <div className="grid grid-cols-[110px_1fr] items-center">
            <div className="flex items-center gap-2 text-[#A3A3A3]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <rect x="2" y="3" width="16" height="14" rx="2" />
                <path d="M6 0v6M14 0v6M2 8h16" />
              </svg>
              <span className="text-sm font-medium font-montserrat">
                Due Date
              </span>
            </div>
            <span className="text-[#525252] text-sm font-medium font-montserrat pl-1">
              {taskData?.date || "No Due Date"}
            </span>
          </div>
        </div>
      </div>

      {/* Comments Divider Header */}
      <div className="mt-2 mb-2 font-bold text-[#262626] text-sm font-montserrat">
        Comments
      </div>

      {/* Comments Cards View */}
      <div className="flex flex-col gap-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="group flex flex-col gap-3 p-4 rounded-xl border border-[#F2F2F2] bg-white-100 shadow-sm hover:shadow transition-shadow relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#262626] font-montserrat">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-400 font-medium font-montserrat">
                      • {comment.time}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium font-montserrat mt-0.5">
                    {comment.date}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteComment(comment.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-7 h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5">
                  <path
                    d="M2.5 3h11M5.5 3V1.5h5V3m-7 0v11.5h9V3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="text-sm text-[#525252] leading-relaxed font-medium font-montserrat pl-1">
              {comment.text}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TaskModel;
