"use client";

import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function AuthNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/login";
  };

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1 }}>
        {/* Logo / Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            component={Link}
            href="/dashboard"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Forecast
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Main nav links */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button component={Link} href="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} href="/accounts" color="inherit">
            Accounts
          </Button>
          <Button component={Link} href="/reports" color="inherit">
            Reports
          </Button>

          {/* Profile Menu */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              ml: 1,
              width: 36,
              height: 36,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {/* Placeholder avatar */}
            <Box sx={{ width: 18, height: 18, bgcolor: "text.primary", borderRadius: "50%" }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

