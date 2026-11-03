import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#e50914" },
      secondary: { main: mode === "dark" ? "#1f1f1f" : "#263238" },
      background:
        mode === "dark"
          ? { default: "#121212", paper: "#1e1e1e" }
          : { default: "#f5f5f5", paper: "#ffffff" },
    },
    shape: { borderRadius: 10 },
  });