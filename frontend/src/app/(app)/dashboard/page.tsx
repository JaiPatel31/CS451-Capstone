"use client";

import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function DashboardPage() {
    const [email, setEmail] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function loadUser() {
            const res = await fetch("/api/auth/me");

            if (!res.ok) {
                window.location.href = "/login";
                return;
            }

            const data = await res.json();
            setEmail(data.email);
        }

        loadUser();
    }, []);

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight={700}>
                Dashboard
            </Typography>

            <Typography sx={{ mt: 2 }}>
                {email ? `Logged in as: ${email}` : "Loading..."}
            </Typography>

            <Button variant="outlined" sx={{ mt: 3 }} onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}

