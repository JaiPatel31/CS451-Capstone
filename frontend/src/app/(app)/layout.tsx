import { Box } from "@mui/material";
import AuthNavbar from "@/components/nav/AuthNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AuthNavbar />
      <Box component="main" sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        {children}
      </Box>
    </Box>
  );
}
