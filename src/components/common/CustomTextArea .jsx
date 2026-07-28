import React from "react";
import { TextField, Typography } from "@mui/material";
// import Typography from "./Typography";

const CustomTextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows,
  minRows,
  maxRows,
  disabled = false,
  error = false,
  helperText = "",
  minHeight = "80px",
  maxHeight,
  height,
  labelColor = "#262626",
}) => {
  return (
    <div className="flex flex-col gap-2 w-full h-[100%]">
      {label && (
        <Typography
          className="text-sm font-[500]"
          style={{ color: labelColor }}>
          {label}
        </Typography>
      )}
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        helperText={helperText}
        fullWidth
        multiline
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        sx={{
          height: height || "auto",
          maxHeight,
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            background: "#FFF",
            display: "flex",
            alignItems: "stretch",
            gap: "8px",
            minHeight: minHeight,
            height: height || "auto",
            maxHeight,
            overflow: "hidden",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D8DCDE",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "#d32f2f" : "#3CAFAA",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "#d32f2f" : "#3CAFAA",
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "150%",
          },
          "& .MuiOutlinedInput-inputMultiline": {
            padding: "10px 12px",
          },
          "& textarea": {
            height: height ? "100%" : "auto",
            overflowY: "auto !important",
            resize: "none",
            boxSizing: "border-box",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "12px",
            marginLeft: "8px",
            marginTop: "4px",
          },
        }}
      />
    </div>
  );
};

export default CustomTextArea;
