import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import { login_member } from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant";
import Image from "next/image";

export default function SignIn() {
  const { login, setLoading } = useUserContext();
  const [loginData, setLoginData] = useState();
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login_member(loginData).then((res) => {
      if (res.data.success) {
        setLoading(true);
        login(res.data.data);
        setMessage({ type: "success", message: res.data.message });
        setLoading(false);
      } else {
        setLoading(false);
        setMessage({ type: "error", message: res.data.message });
      }
    });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        position: "absolute",
        margin: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "700px",
        width: "90%",
        boxShadow:
          window.innerWidth < 800
            ? "none"
            : `rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px`,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "25px auto" }}>
          <Image
            src="MainLogo.png"
            alt="Picture of the author"
            width={150}
            height={100}
          />
        </div>
        <Typography
          component="h1"
          variant="h5"
          style={{ color: mainThemeColor, fontWeight: 700, fontSize: "25px" }}
        >
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Alert
            variant="standard"
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone number"
            name="phone"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
    </Container>
  );
}
