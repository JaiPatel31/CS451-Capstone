import { Box } from "@mui/material";
import PublicNavbar from "@/components/nav/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <PublicNavbar />
      <Box component="main">{children}</Box>
    </Box>
  );
}
