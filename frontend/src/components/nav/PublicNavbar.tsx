import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function PublicNavbar() {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1 }}>
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
          <Typography variant="h6" fontWeight={700}>
            Forecast
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit">Login</Button>
          <Button variant="contained">Get Started</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}