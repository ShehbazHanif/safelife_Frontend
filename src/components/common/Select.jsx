import React from "react";
import { Select as MuiSelect, MenuItem } from "@mui/material";

const Select = ({
  value,
  onChange,
  options = [],
  menuItems,
  optionValue = "value",
  optionLabel = "label",
  valueKey,
  labelKey,
  displayEmpty = false,
  renderValue,
  placeholder = "Select",
  fontSize = "1",
  disabled = false,
  className = "",
  icon,
  name,
  endIcon, // Added to receive custom action end components if passed
  sx = {},
}) => {
  const selectOptions = menuItems || options;
  const normalizedValueKey = valueKey || optionValue;
  const normalizedLabelKey = labelKey || optionLabel;
  const defaultRenderValue = (selected) => {
    if (selected === "" || selected === null || selected === undefined) {
      return <span style={{ color: "#9CA3AF" }}>{placeholder}</span>;
    }
    // Automatically display matching human-readable label if value is selected
    const selectedOpt = selectOptions.find(
      (opt) =>
        (typeof opt === "string" ? opt : opt[normalizedValueKey]) === selected,
    );
    return selectedOpt && typeof selectedOpt !== "string"
      ? selectedOpt[normalizedLabelKey]
      : selected;
  };

  return (
    <MuiSelect
      name={name}
      value={value === undefined || value === null ? "" : value}
      onChange={onChange}
      displayEmpty={displayEmpty || value === "" || value === null || value === undefined}
      renderValue={renderValue || defaultRenderValue}
      disabled={disabled}
      className={className}
      variant="outlined"
      {...(icon && { IconComponent: icon })}
      MenuProps={{
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        PopperProps: {
          modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
        },
      }}
      sx={{
        // FIXED: Removed absolute 'width: 100%' layout blocks to let external flex styling parameters function smoothly
        backgroundColor: "var(--Grey-White, #FFFFFF)",
        borderRadius: "16px", // Matches your rounded figma filter button setup
        color: "black",
        border: "1px solid var(--Grey-Grey-300, #D8DCDE)",

        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          fontFamily: "Montserrat",
          fontSize: "14px",
          // Styled cleanly with explicit fallback pads to maintain your explicit structural alignments
          padding: "10px 16px",
        },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "& .MuiSvgIcon-root": { color: "grey" },
        "&.Mui-focused": { borderColor: "var(--Grey-Grey-300, #D8DCDE)" },
        ...sx,
      }}>
      {selectOptions.map((opt) => {
        const itemValue = typeof opt === "string" ? opt : opt[normalizedValueKey];
        const itemLabel = typeof opt === "string" ? opt : opt[normalizedLabelKey];

        return (
          <MenuItem
            key={itemValue}
            value={itemValue}
            sx={{
              fontFamily: "Montserrat",
              fontSize: "14px",
              "&:hover": { backgroundColor: "#3CAFAA", color: "white" },
              "&.Mui-selected": { backgroundColor: "#004A68", color: "white" },
              "&.Mui-selected:hover": {
                backgroundColor: "#00364d",
                color: "white",
              },
            }}>
            {itemLabel}
          </MenuItem>
        );
      })}
    </MuiSelect>
  );
};

export default Select;
