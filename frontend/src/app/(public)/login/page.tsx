"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();
    // expected shape: { token: "jwt-here" }

    localStorage.setItem("forecast_token", data.token);

    router.push("/dashboard");
  } catch (err) {
    setError("Login failed. Check your email and password.");
  } finally {
    setLoading(false);
  }
}


  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Typography variant="h5" fontWeight={700}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            fullWidth
          />

          {error && (
            <Typography sx={{ mt: 0.5 }} color="error">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 1, minHeight: 44 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

