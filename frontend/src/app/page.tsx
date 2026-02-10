import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h3" fontWeight={600}>
        Forecast
      </Typography>
    </Box>
  );
}
