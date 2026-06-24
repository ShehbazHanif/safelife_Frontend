import React from "react";
import { Slider } from "@mui/material";

const RangeSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  name,
}) => {
  return (
    <Slider
      value={value}
      onChange={(e, val) => onChange({ target: { name, value: val } })}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="auto"
      sx={{
        width: 192, // w-48 equivalent
        height: 8,
        padding: "13px 0",
        // Rail background color
        "& .MuiSlider-rail": {
          backgroundColor: "#F2F2F2",
          opacity: 1,
          borderRadius: "4px",
        },
        // Active track color
        "& .MuiSlider-track": {
          backgroundColor: "#004A68",
          border: "none",
          borderRadius: "4px",
        },
        // Thumb styling - visible with color and hover effects
        "& .MuiSlider-thumb": {
          backgroundColor: "#004A68",
          width: 20,
          height: 20,
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0, 74, 104, 0.3)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 74, 104, 0.5)",
          },
          "&.Mui-active": {
            boxShadow: "0 4px 12px rgba(0, 74, 104, 0.6)",
          },
        },
        // Tooltip styling
        "& .MuiSlider-valueLabel": {
          backgroundColor: "#004A68",
          color: "#fff",
        },
        "& .MuiSlider-valueLabelLabel": {
          color: "#fff",
        },
      }}
    />
  );
};

export default RangeSlider;
