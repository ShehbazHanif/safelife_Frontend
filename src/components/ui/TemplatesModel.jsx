import React, { useState } from "react";
import { Modal } from "../common/Modal"; // Make sure this path points to your Modal file
import Button from "../common/Button"; // Make sure this path points to your Button file

// Mock data array based on your image
const AGENT_TEMPLATES = [
  {
    id: "customer-support",
    title: "Customer Support",
    description:
      "Efficiently handle FAQs, troubleshoot issues, and provide instant resolutions to user queries",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "appointment-setter",
    title: "Appointment Setter",
    description:
      "Lorem ipsum dolor sit amet consectetur. Congue semper non tristique erat quisque risus. Enim.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "feedback-collector",
    title: "Feedback Collector",
    description:
      "Lorem ipsum dolor sit amet consectetur. Pretium lobortis arcu iaculis nisi in tristique et id blandit.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "sales-assistant",
    title: "Sales Assistant",
    description:
      "Lorem ipsum dolor sit amet consectetur. In et eu tincidunt lorem. Porta consectetur velit turpis quis.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "onboarding-helper",
    title: "Onboarding Helper",
    description:
      "Lorem ipsum dolor sit amet consectetur. Enim sollicitudin scelerisque duis amet quis mauris.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: "event-reminder",
    title: "Event Reminder",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut nullam aenean netus lectus dignissim eu. Tellus at lorem.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  },
];

// Passing isOpen and onClose as props so the parent view can control when this modal pops up
const TemplatesModel = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("customer-support");

  const handleNext = () => {
    console.log("Selected Template ID:", selectedTemplate);
    // Add your routing or submission logic here
    if (onClose) onClose();
  };

  /* Footer layout matching your Figma screen exactly */
  const modalFooter = (
    <>
      <Button
        onClick={onClose}
        className="px-6 py-2.5 rounded-full text-sm font-medium font-montserrat !bg-[#F2F2F2] !text-[#737373] hover:!bg-[#E5E7EB]  transition-colors cursor-pointer">
        Cancel
      </Button>
      <Button
        onClick={handleNext}
        className="px-6 py-2.5 rounded-full text-sm font-medium font-montserrat text-white bg-[#004e69] hover:bg-[#003b50] transition-colors cursor-pointer">
        Next
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Templates"
      maxWidth="760px" // Wider width to give the 2-column cards comfortable breathing room
      footer={modalFooter}
      footerType="actions-only">
      {/* Grid container matches your parent Div spec */}
      <div className="grid grid-cols-2 gap-4 items-center self-stretch w-full">
        {AGENT_TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            /* Inner Div 1: Card container with conditional active border */
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`flex flex-col items-start gap-4 p-4 flex-1 shrink-0 basis-0 rounded-xl cursor-pointer transition-all bg-white
                ${
                  isSelected
                    ? "border-[4px] border-[#B5E8F7]"
                    : "border border-[#F2F2F2] hover:border-gray-200"
                }`}>
              {/* Div 1 of Inner Div 1: Header (Avatar + Title) */}
              <div className="flex items-center gap-2 self-stretch">
                <img
                  src={template.avatar}
                  alt={template.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="text-[#262626] font-montserrat text-base ">
                  {template.title}
                </h3>
              </div>

              {/* Description Text */}
              <p className="text-[#737373] font-montserrat text-xb ">
                {template.description}
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default TemplatesModel;
