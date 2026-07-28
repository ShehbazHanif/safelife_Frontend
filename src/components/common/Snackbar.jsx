import React from "react";
import { Snackbar as MUISnackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Snackbar = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 4000,
  onClose,
  action,
  anchorOrigin = { vertical: "top", horizontal: "right" },
  variant = "filled",
  hideClose = false,
  ...rest
}) => {
  const severityStyles = {
    success: {
      backgroundColor: "#3CAFAA",
      color: "#fff",
    },
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    if (onClose) onClose(event, reason);
  };

  const closeAction = hideClose ? null : (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={(e) => handleClose(e, "closeButton")}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const combinedAction = action ? (
    <>
      {action}
      {hideClose ? null : closeAction}
    </>
  ) : (
    closeAction
  );

  return (
    <MUISnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      {...rest}>
      <Alert
        onClose={hideClose ? undefined : handleClose}
        severity={severity}
        variant={variant}
        sx={{
          borderRadius: "12px",
          alignItems: "center",
          ...(severityStyles[severity] || {}),
        }}
        action={combinedAction}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export { Snackbar };
export default Snackbar;
