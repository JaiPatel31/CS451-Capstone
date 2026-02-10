"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function DashboardPage() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("forecast_token");
    if (!token) router.replace("/login");
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("forecast_token");
    router.replace("/login");
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700}>
        Dashboard
      </Typography>

      <Typography sx={{ mt: 1 }}>
        You are logged in (dummy auth).
      </Typography>

      <Button variant="outlined" sx={{ mt: 3 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
