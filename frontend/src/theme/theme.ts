import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e40af", // deep blue
    },
    secondary: {
      main: "#0ea5e9",
    },
    background: {
      default: "#0066ff",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },


  shape: {
    borderRadius: 0,
  },

  components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        padding: "10px 20px",
        minHeight: 44,
        minWidth: 120,      
        whiteSpace: "nowrap",
        flexShrink: 0,       
        lineHeight: 1.2,
      },
    },
  },
},
});

export default theme;

