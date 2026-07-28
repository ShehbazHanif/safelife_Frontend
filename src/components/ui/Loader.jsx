import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useLoader } from "../../contexts/LoaderContext";

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="bg-white-100 rounded-xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 min-w-[200px]">
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#3CAFAA",
            }}
            aria-label="Loading..."
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#4B5563",
            fontWeight: 500,
          }}>
          Loading...
        </Typography>
      </div>
    </div>
  );
};

export default Loader;
