import React from "react";

const CheckBox = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: "20px",
      height: "20px",
      borderRadius: "6px",
      // Border becomes secondary color (#3CAFAA) when checked
      border: checked ? "1px solid #3CAFAA" : "1px solid #D8DCDE",
      // Background becomes primary color (#004A68) when checked
      background: checked ? "#004A68" : "transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "0.15s",
    }}>
    {checked && (
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path
          d="M1 4.5L4.5 8L11 1"
          stroke="#FFFFFF" /* Changed to White so it's visible on top of #004A68 */
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

export default CheckBox;
