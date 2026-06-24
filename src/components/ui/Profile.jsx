import React, { useState } from "react";
import Input from "../common/Input";

const Profile = ({ isEditing }) => {
  // Local state initialized with your default user info
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    role: "System Administrator",
    phoneNumber: "+1 234 234567",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`flex flex-col items-start self-stretch p-6 rounded-2xl border border-[#F2F2F2] bg-[#F9F9F9] shadow-[0_1px_4px_0_rgba(133,146,173,0.10)] font-['Montserrat'] gap-6 w-full transition-all ${
        isEditing ? "max-h-[450px] overflow-y-auto" : ""
      }`}>
      {/* Profile Image Section */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        <span className="text-[#262626] text-sm font-medium leading-[150%]">
          Profile image
        </span>
        <div className="flex flex-col items-center gap-2">
          <div className="flex p-[20.267px] items-center gap-[5.067px] rounded-[63.333px] bg-[#B5E8F7]">
            <svg
              className="w-[27.708px] h-[27.708px] fill-[#004A68]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
            </svg>
          </div>

          {/* Action Row for Editing Image (Visible during Edit Mode) */}
          {isEditing && (
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <button className="hover:text-[#004A68] flex items-center gap-1">
                {/* Pencil Edit Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <span className="text-gray-300">|</span>
              <button className="hover:text-red-500 flex items-center gap-1">
                {/* Trash Delete Icon */}
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
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Wrapper for fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 w-full">
        {/* Full Name */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[#262626] text-sm font-medium leading-[150%]">
            Full Name
          </label>
          {isEditing ? (
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-11 px-4 l !border !border-[#E5E7EB] bg-white text-gray-800 focus:outline-none focus:border-[#004A68] transition-colors"
            />
          ) : (
            <p className="text-[#737373] text-sm font-normal leading-[150%] px-1">
              {formData.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[#262626] text-sm font-medium leading-[150%]">
            Email Address
          </label>
          {isEditing ? (
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 px-4 text-sm font-normal  !border !border-[#E5E7EB] bg-white text-gray-800 focus:outline-none focus:border-[#004A68] transition-colors"
            />
          ) : (
            <p className="text-[#737373] text-sm font-normal leading-[150%] px-1">
              {formData.email}
            </p>
          )}
        </div>

        {/* Role (Read-only/Disabled look matching the image grey background) */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[#262626] text-sm font-medium leading-[150%]">
            Role
          </label>
          {isEditing ? (
            <Input
              type="text"
              name="role"
              value={formData.role}
              className="w-full h-11 px-4 text-sm font-normal  !border !border-[#EAEAEA]  text-gray-400 "
            />
          ) : (
            <p className="text-[#737373] text-sm font-normal leading-[150%] px-1">
              {formData.role}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[#262626] text-sm font-medium leading-[150%]">
            Phone Number
          </label>
          {isEditing ? (
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full h-11 px-4 text-sm font-normal  !border !border-[#E5E7EB] bg-white text-gray-800 focus:outline-none focus:border-[#004A68] transition-colors"
            />
          ) : (
            <p className="text-[#737373] text-sm font-normal leading-[150%] px-1">
              {formData.phoneNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
