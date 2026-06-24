import React, { useState } from "react";
import { Modal } from "../common/Modal"; // Adjust path if necessary
import Select from "../common/Select"; // Path to your custom select component
import RangeSlider from "../common/RangeSlider"; // Path to your new range slider

const AdvancedSettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    waitForGreeting: true,
    backgroundSound: true,
    llmModel: "gpt 4.1",
    deepGramModel: "flux",
    elevenLabsModel: "eleven_V3",
    temperature: 30,
    speed: 40,
    stability: 25,
    style: 35,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved Settings Data:", settings);
    if (onClose) onClose();
  };

  //   const modalFooter = (
  //     <>
  //       <button
  //         onClick={onClose}
  //         className="px-6 py-2.5 rounded-full text-sm font-medium font-montserrat text-[#737373] bg-[#EBEBEB] hover:bg-gray-300 transition-colors cursor-pointer">
  //         Cancel
  //       </button>
  //       <button
  //         onClick={handleSave}
  //         className="px-6 py-2.5 rounded-full text-sm font-medium font-montserrat text-white bg-[#004e69] hover:bg-[#003b50] transition-colors cursor-pointer">
  //         Save Settings
  //       </button>
  //     </>
  //   );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Settings"
      maxWidth="540px"
      //footer={modalFooter}
    >
      <div className="flex flex-col items-start gap-4 self-stretch w-full font-montserrat">
        {/* --- TOGGLE ROW 1: Wait for Greeting --- */}
        <div className="flex items-center justify-between gap-8 self-stretch">
          <span className="text-[#2F3941] text-sm font-semibold leading-[150%]">
            Wait for greeting
          </span>
          <button
            onClick={() =>
              handleChange("waitForGreeting", !settings.waitForGreeting)
            }
            className="focus:outline-none cursor-pointer transition-opacity hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none">
              <rect
                width="40"
                height="20"
                rx="10"
                fill={settings.waitForGreeting ? "#004A68" : "#D8DCDE"}
              />
              <circle
                cx={settings.waitForGreeting ? "29" : "11"}
                cy="10"
                r="6"
                fill="white"
                className="transition-all duration-200"
              />
            </svg>
          </button>
        </div>

        {/* --- TOGGLE ROW 2: Background Sound --- */}
        <div className="flex items-center justify-between gap-8 self-stretch">
          <span className="text-[#2F3941] text-sm font-semibold leading-[150%]">
            Background Sound
          </span>
          <button
            onClick={() =>
              handleChange("backgroundSound", !settings.backgroundSound)
            }
            className="focus:outline-none cursor-pointer transition-opacity hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none">
              <rect
                width="40"
                height="20"
                rx="10"
                fill={settings.backgroundSound ? "#004A68" : "#D8DCDE"}
              />
              <circle
                cx={settings.backgroundSound ? "29" : "11"}
                cy="10"
                r="6"
                fill="white"
                className="transition-all duration-200"
              />
            </svg>
          </button>
        </div>

        {/* --- DROPDOWN ROW 1: LLM Model --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">
            LLM Model
          </span>
          <Select
            value={settings.llmModel}
            onChange={(e) => handleChange("llmModel", e.target.value)}
            options={["gpt 4.1", "gpt-4o", "claude-3-opus"]}
            className="w-48"
          />
        </div>

        {/* --- DROPDOWN ROW 2: DeepGram Model --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">
            DeepGram Model
          </span>
          <Select
            value={settings.deepGramModel}
            onChange={(e) => handleChange("deepGramModel", e.target.value)}
            options={["flux", "nova-2", "enhanced"]}
            className="w-48"
          />
        </div>

        {/* --- DROPDOWN ROW 3: Eleven Labs Model --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">
            Eleven Labs Model
          </span>
          <Select
            value={settings.elevenLabsModel}
            onChange={(e) => handleChange("elevenLabsModel", e.target.value)}
            options={["eleven_V3", "eleven_turbo_v2"]}
            className="w-48"
          />
        </div>

        {/* --- SLIDER 1: Temperature --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">
            Temperature
          </span>
          <RangeSlider
            name="temperature"
            value={settings.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
          />
        </div>

        {/* --- SLIDER 2: Speed --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">Speed</span>
          <RangeSlider
            name="speed"
            value={settings.speed}
            onChange={(e) => handleChange("speed", e.target.value)}
          />
        </div>

        {/* --- SLIDER 3: Stability --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">
            Stability
          </span>
          <RangeSlider
            name="stability"
            value={settings.stability}
            onChange={(e) => handleChange("stability", e.target.value)}
          />
        </div>

        {/* --- SLIDER 4: Style --- */}
        <div className="flex justify-between items-center self-stretch">
          <span className="text-[#2F3941] text-sm font-montserrat">Style</span>
          <RangeSlider
            name="style"
            value={settings.style}
            onChange={(e) => handleChange("style", e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedSettingsModal;
