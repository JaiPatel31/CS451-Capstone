import { Box, Typography } from "@mui/material";
import PublicNavbar from "@/components/nav/PublicNavbar";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <PublicNavbar />

      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 6, md: 10 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Landing Page
        </Typography>
      </Box>
    </Box>
  );
}