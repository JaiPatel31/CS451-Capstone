import { Box, Typography } from "@mui/material";

export default function GetStartedPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h4" fontWeight={700}>Get Started</Typography>
      <Typography sx={{ mt: 1 }}>Skeleton page.</Typography>
    </Box>
  );
}
