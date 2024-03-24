import { setMode } from "../state";
import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeMode = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  let mode = theme.palette.mode;
  const dark = theme.palette.neutral.dark;

  return (
    <IconButton onClick={() => dispatch(setMode())}>
      {mode === "dark" ? (
        <DarkMode sx={{ fontSize: "25px" }} />
      ) : (
        <LightMode sx={{ color: dark, fontSize: "25px" }} />
      )}
    </IconButton>
  );
};

export default ThemeMode;
