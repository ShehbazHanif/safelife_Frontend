// import React from "react";
// import { Box, IconButton } from "@mui/material";
// import Button from "./Button";
// import "../../App.css";

// export const Modal = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   footer,
//   footerReplacement = null,
//   onSave,
//   onCancel,
//   maxWidth = "500px",
//   className = "",
//   titleStyle = {},
//   bodyStyle = {},
// }) => {
//   if (!isOpen) return null;

//   // Conditional footer rendering based on footerType
//   const renderFooter = () => {
//     if (footerType === "actions-only" && onSave && onCancel) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             gap: "8px",
//             width: "100%",
//             justifyContent: "flex-end", // Keeps standard cancel/save buttons aligned to the right side
//           }}>
//           <Button variant="secondary" onClick={onCancel || onClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={onSave || onClose}>
//             Save
//           </Button>
//         </Box>
//       );
//     }
//     // For 'custom' or 'comment-only', return the custom footer element directly
//     return footer;
//   };

//   // Determine standard wrapper layouts based on what type of content is rendering
//   const isCustom = footerType === "custom" || footerType === "comment-only";

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 50,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//       }}>
//       {/* Modal Dialog Container */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           borderRadius: "16px",
//           overflow: "hidden",
//           width: "100%",
//           maxWidth: maxWidth,
//           backgroundColor: "#FFF",
//           boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
//           height: "auto",
//           maxHeight: "calc(100vh - 40px)",
//         }}
//         className={className}>
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             padding: "10px 20px 10px 35px",
//             alignItems: "center",
//             alignSelf: "stretch",
//             backgroundColor: "#FFF",
//             boxShadow: "inset 0 -1px 0 0 #E9EBED",
//           }}>
//           {title && (
//             <Box
//               sx={{
//                 flex: 1,
//                 color: "#262626",
//                 fontFamily: "Montserrat",
//                 fontSize: "16px",
//                 fontWeight: 700,
//                 lineHeight: "150%",
//                 ...titleStyle,
//               }}>
//               {title}
//             </Box>
//           )}

//           <IconButton
//             onClick={onClose}
//             sx={{
//               width: "40px",
//               height: "40px",
//               padding: 0,
//               color: "#6B7280",
//               transition: "color 0.2s",
//               "&:hover": {
//                 color: "#374151",
//                 backgroundColor: "#F3F4F6",
//               },
//             }}>
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2">
//               <path d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </IconButton>
//         </Box>

//         {/* Body */}
//         <Box
//           sx={{
//             display: "flex",
//             padding: "20px 40px",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             gap: "8px",
//             alignSelf: "stretch",
//             backgroundColor: "#FFF",
//             overflowY: "auto",
//             ...bodyStyle,
//           }}>
//           {children}
//         </Box>

//         {/* Footer Container */}
//         {(footer || footerType !== "custom") && (
//           <Box
//             sx={{
//               display: "flex",
//               padding: isCustom ? "20px 40px" : "20px 40px", // Removes padding if custom comment box handles its own spacing
//               alignItems: "center",
//               justifyContent: isCustom ? "space-between" : "flex-end",
//               alignSelf: "stretch",
//               backgroundColor: "#FFF",
//               boxShadow: "inset 0 1px 0 0 #E9EBED",
//               width: "100%",
//               boxSizing: "border-box",
//             }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 justifyContent: isCustom ? "space-between" : "flex-end",
//                 alignItems: "center",
//                 gap: "8px",
//               }}>
//               {renderFooter()}
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

import React from "react";
import { Box, IconButton } from "@mui/material";
import Button from "./Button";
import "../../App.css";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  footerReplacement = null,
  onSave,
  onCancel,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  maxWidth = "500px",
  className = "",
  titleStyle = {},
  bodyStyle = {},
  zIndex,
}) => {
  if (!isOpen) return null;

  const hasFooter =
    footerReplacement || footer || onSave || onSubmit || onCancel;
  const primaryAction = onSave || onSubmit;
  const primaryLabel = submitLabel || "Save";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: zIndex ?? 50,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          width: "100%",
          maxWidth: maxWidth,
          backgroundColor: "#FFF",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
          maxHeight: "calc(100vh - 40px)",
        }}
        className={className}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            padding: "10px 20px 10px 35px",
            alignItems: "center",
            backgroundColor: "#FFF",
            boxShadow: "inset 0 -1px 0 0 #E9EBED",
            justifyContent: "space-between",
          }}>
          {title && (
            <Box
              sx={{
                color: "#262626",
                fontFamily: "Montserrat",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "150%",

                ...titleStyle,
              }}>
              {title}
            </Box>
          )}

          <IconButton
            onClick={onClose}
            sx={{
              width: "40px",
              height: "40px",
              padding: 0,
              color: "#6B7280",

              "&:hover": {
                color: "#374151",
                backgroundColor: "#F3F4F6",
              },
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </Box>

        {/* Body */}
        <Box
          sx={{
            display: "flex",
            padding: "20px 40px",
            flexDirection: "column",
            gap: "8px",
            backgroundColor: "#FFF",
            overflowY: "auto",
            ...bodyStyle,
          }}>
          {children}
        </Box>

        {/* Footer */}
        {hasFooter && (
          <Box
            sx={{
              display: "flex",
              padding: "20px 40px",
              alignItems: "center",
              justifyContent: footerReplacement ? "space-between" : "flex-end",
              backgroundColor: "#FFF",
              boxShadow: "inset 0 1px 0 0 #E9EBED",
              width: "100%",
              boxSizing: "border-box",
            }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: footerReplacement
                  ? "space-between"
                  : "flex-end",
                alignItems: "center",
                gap: "8px",
              }}>
              {footerReplacement ? (
                footerReplacement
              ) : footer ? (
                footer
              ) : (
                <>
                  {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>
                      {cancelLabel}
                    </Button>
                  )}

                  {primaryAction && (
                    <Button variant="primary" onClick={primaryAction}>
                      {primaryLabel}
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
