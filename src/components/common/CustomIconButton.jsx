import { IconButton } from "@mui/material";
import React from "react";

const CustomIconButton = ({
  icon,
  backgroundColor,
  onClick,
  sx = {},
  ...props
}) => {
  const baseSx = {
    "&.MuiButtonBase-root": {
      minWidth: "0px",
      minHeight: "0px",
      padding: "6px",
      margin: "0px",
      backgroundColor: backgroundColor ? backgroundColor : undefined,
    },
    "&:hover": {
      backgroundColor: "#3CAFAA",
    },
    "&:hover svg": {
      color: "#fff !important",
      fill: "#fff !important",
    },
  };
  return (
    <IconButton sx={{ ...baseSx, ...sx }} onClick={onClick} {...props}>
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
