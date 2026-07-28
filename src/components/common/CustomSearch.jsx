import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const CustomSearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  sx = {},
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "24px",
        minWidth: 350,
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          paddingRight: 0,
          paddingY: "2px",
          border: "#D4D4D4",
          fontSize: "14px",
          fontWeight: 400,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3CAFAA",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3CAFAA",
          },
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="#737373" sx={{ fontSize: "20px" }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
