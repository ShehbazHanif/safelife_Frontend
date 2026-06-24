import { useState } from "react";
import { Modal } from "../common/Modal"; // Using your custom shared Modal component
import Input from "../common/Input"; // Using your shared Input component
import Button from "../common/Button"; // Using your shared Button component

const PasswordModel = ({ isOpen, onClose }) => {
  // Field visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Implement your pass update dispatch action here
    console.log("Submitting password update payload:", passwordData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      footerType="custom"
      maxWidth="440px"
      footer={
        <div className="flex justify-end items-center gap-3 w-full border-t border-gray-100 pt-4 mt-2">
          {/* Cancel Action Button */}
          <Button
            variant="secondary"
            onClick={onClose}
            className="!bg-[#F2F2F2] !text-gray-700 hover:!bg-gray-200 h-10 px-5 text-sm font-semibold !rounded-[100px]">
            Cancel
          </Button>

          {/* Submit Action Button */}
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="!bg-[#004A68] !text-white hover:!bg-[#00354b] h-10 px-5 text-sm font-semibold !rounded-[100px]">
            Update Password
          </Button>
        </div>
      }>
      <div className="flex flex-col gap-4 w-full">
        {/* Current Password Field */}
        <div className="flex flex-col items-start gap-2 w-full relative">
          <Input
            label="Current Password"
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            placeholder="********"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className="!pr-10 !h-10 !py-2  text-sm placeholder-gray-700  !border !border-[#E5E7EB] "
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 bottom-[13px] flex items-center justify-center w-4 h-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00112 13.3333C4.65847 13.3333 2.04544 10.9275 0.280518 7.77589C-0.0933629 7.10407 -0.0933629 6.21641 0.27966 5.57566C2.02414 2.4259 4.65409 0 8.00112 0C11.3438 0 13.9568 2.40579 15.7217 5.55745C16.0939 6.22624 16.0956 7.10893 15.7188 7.76459C13.9742 10.911 11.3457 13.3333 8.00112 13.3333ZM14.6263 6.80899C14.68 6.71641 14.68 6.60407 14.6283 6.51122C13.0886 3.76167 10.8131 1.66667 8.00112 1.66667C5.18604 1.66667 2.89681 3.77828 1.36695 6.54014C1.32227 6.61692 1.32227 6.72926 1.37394 6.82211C2.91369 9.57166 5.18916 11.6667 8.00112 11.6667C10.8162 11.6667 13.1054 9.55505 14.6263 6.80899ZM8.00112 10C6.52836 10 5.33446 8.50762 5.33446 6.66667C5.33446 4.82572 6.52836 3.33333 8.00112 3.33333C9.47388 3.33333 10.6678 4.82572 10.6678 6.66667C10.6678 8.50762 9.47388 10 8.00112 10ZM8.00112 8.33333C8.7375 8.33333 9.33445 7.58714 9.33445 6.66667C9.33445 5.74619 8.7375 5 8.00112 5C7.26474 5 6.66779 5.74619 6.66779 6.66667C6.66779 7.58714 7.26474 8.33333 8.00112 8.33333Z"
                fill={showCurrent ? "#004A68" : "#68737D"}
              />
            </svg>
          </button>
        </div>

        {/* New Password Field */}
        <div className="flex flex-col items-start gap-2 w-full relative">
          <Input
            label="New Password"
            type={showNew ? "text" : "password"}
            name="newPassword"
            placeholder="********"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="!pr-10 !h-10 !py-2  text-sm placeholder-gray-700  !border !border-[#E5E7EB]"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 bottom-[13px] flex items-center justify-center w-4 h-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00112 13.3333C4.65847 13.3333 2.04544 10.9275 0.280518 7.77589C-0.0933629 7.10407 -0.0933629 6.21641 0.27966 5.57566C2.02414 2.4259 4.65409 0 8.00112 0C11.3438 0 13.9568 2.40579 15.7217 5.55745C16.0939 6.22624 16.0956 7.10893 15.7188 7.76459C13.9742 10.911 11.3457 13.3333 8.00112 13.3333ZM14.6263 6.80899C14.68 6.71641 14.68 6.60407 14.6283 6.51122C13.0886 3.76167 10.8131 1.66667 8.00112 1.66667C5.18604 1.66667 2.89681 3.77828 1.36695 6.54014C1.32227 6.61692 1.32227 6.72926 1.37394 6.82211C2.91369 9.57166 5.18916 11.6667 8.00112 11.6667C10.8162 11.6667 13.1054 9.55505 14.6263 6.80899ZM8.00112 10C6.52836 10 5.33446 8.50762 5.33446 6.66667C5.33446 4.82572 6.52836 3.33333 8.00112 3.33333C9.47388 3.33333 10.6678 4.82572 10.6678 6.66667C10.6678 8.50762 9.47388 10 8.00112 10ZM8.00112 8.33333C8.7375 8.33333 9.33445 7.58714 9.33445 6.66667C9.33445 5.74619 8.7375 5 8.00112 5C7.26474 5 6.66779 5.74619 6.66779 6.66667C6.66779 7.58714 7.26474 8.33333 8.00112 8.33333Z"
                fill={showNew ? "#004A68" : "#68737D"}
              />
            </svg>
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col items-start gap-2 w-full relative">
          <Input
            label="Confirm New Password"
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="********"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="!pr-10 !h-10 !py-2  text-sm placeholder-gray-700  !border !border-[#E5E7EB]"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 bottom-[13px] flex items-center justify-center w-4 h-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00112 13.3333C4.65847 13.3333 2.04544 10.9275 0.280518 7.77589C-0.0933629 7.10407 -0.0933629 6.21641 0.27966 5.57566C2.02414 2.4259 4.65409 0 8.00112 0C11.3438 0 13.9568 2.40579 15.7217 5.55745C16.0939 6.22624 16.0956 7.10893 15.7188 7.76459C13.9742 10.911 11.3457 13.3333 8.00112 13.3333ZM14.6263 6.80899C14.68 6.71641 14.68 6.60407 14.6283 6.51122C13.0886 3.76167 10.8131 1.66667 8.00112 1.66667C5.18604 1.66667 2.89681 3.77828 1.36695 6.54014C1.32227 6.61692 1.32227 6.72926 1.37394 6.82211C2.91369 9.57166 5.18916 11.6667 8.00112 11.6667C10.8162 11.6667 13.1054 9.55505 14.6263 6.80899ZM8.00112 10C6.52836 10 5.33446 8.50762 5.33446 6.66667C5.33446 4.82572 6.52836 3.33333 8.00112 3.33333C9.47388 3.33333 10.6678 4.82572 10.6678 6.66667C10.6678 8.50762 9.47388 10 8.00112 10ZM8.00112 8.33333C8.7375 8.33333 9.33445 7.58714 9.33445 6.66667C9.33445 5.74619 8.7375 5 8.00112 5C7.26474 5 6.66779 5.74619 6.66779 6.66667C6.66779 7.58714 7.26474 8.33333 8.00112 8.33333Z"
                fill={showConfirm ? "#004A68" : "#68737D"}
              />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModel;
