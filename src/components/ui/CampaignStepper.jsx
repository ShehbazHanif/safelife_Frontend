import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const steps = [
  "Campaign Details",
  "Select Contacts",
  "Attach Webhook",
  "Preview",
];

// Custom connector for the line between steps
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "&.MuiStepConnector-root": {
    top: 12,
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)",
  },
  "& .MuiStepConnector-line": {
    borderColor: "#D8DCDE",
    borderTopWidth: 1,
    height: 0,
  },
  "&.Mui-completed .MuiStepConnector-line": {
    borderColor: "#004A68",
  },
  "&.Mui-active .MuiStepConnector-line": {
    borderColor: "#004A68",
  },
}));

export default function CampaignStepper({ currentStep = 1 }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={currentStep - 1}
        alternativeLabel
        connector={<CustomConnector />}
        sx={{
          padding: 0,
          "& .MuiStep-root": {
            padding: 0,
          },
        }}>
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": {
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#004A68",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#004A68",
                  },
                  "& .MuiStepIcon-root:not(.Mui-active):not(.Mui-completed)": {
                    color: "#BDBDBD",
                  },
                  "& .MuiStepLabel-label": {
                    fontSize: "14px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    marginTop: "2px",
                    lineHeight: "150%",
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "#004A68",
                  },
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: "#004A68",
                  },
                  "& .MuiStepLabel-label:not(.Mui-active):not(.Mui-completed)":
                    {
                      color: "#9CA3AF",
                    },
                }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
