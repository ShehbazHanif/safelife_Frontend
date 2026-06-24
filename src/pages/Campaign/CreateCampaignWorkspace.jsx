import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateCampaignHeader from "../../components/ui/CreateCampaignHeader";
import CampaignStepper from "../../components/ui/CampaignStepper";
import StepCampaignDetails from "../../components/ui/StepCampaignDetails";
import StepCampaignPreview from "../../components/ui/StepCampaignPreview";
import CampaignContact from "../../components/ui/CampaignContact";
import CampaignWebhook from "../../components/ui/CampaignWebhook";

const CreateCampaignWorkspace = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const handleNext = async () => {
    // Validate current step before moving to next
    let isValid = true;

    if (currentStep === 1 && step1Ref.current) {
      isValid = await step1Ref.current.validate();
    } else if (currentStep === 2 && step2Ref.current) {
      isValid = await step2Ref.current.validate?.();
    } else if (currentStep === 3 && step3Ref.current) {
      isValid = await step3Ref.current.validate?.();
    }

    // Only move to next step if validation passes
    if (isValid !== false) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleLaunchExecution = () =>
   //
  navigate("/campaigns");

  // Step Switcher Logic Mapping
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepCampaignDetails ref={step1Ref} />;
      case 2:
        return <CampaignContact ref={step2Ref}  />;
      case 3:
        return <CampaignWebhook ref={step3Ref} />;
      case 4:
        return <StepCampaignPreview />;
      default:
        return <StepCampaignDetails ref={step1Ref} />;
    }
  };

  return (
    <div className="flex h-full w-full px-4 pb-4 flex-col items-start bg-white overflow-hidden gap-4">
      {/* Top Header Controls row layer */}
      <CreateCampaignHeader
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        onLaunch={handleLaunchExecution}
      />

      {/* Progress Timelines Stepper Node Matrix */}
      <CampaignStepper currentStep={currentStep} />

      {/* Core Dynamic Content Container Box Viewport */}
      <div
        className="flex w-[1312px] max-w-full p-[24px] py-[8px] flex-col justify-center items-flex-start rounded-[24px] bg-[#F9F9F9]"
        style={{ boxShadow: "0px 1px 4px 0px rgba(133, 146, 173, 0.10)" }}>
        <div className="w-full py-4 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignWorkspace;
