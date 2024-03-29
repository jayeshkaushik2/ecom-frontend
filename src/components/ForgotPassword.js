import React, { useContext, useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import { postForgotEmail } from "../context/Apis";
import { useNavigate } from "react-router-dom";

const ForgotPassword = (props) => {
  const [Email, setEmail] = useState("");
  let redirect = useNavigate();

  const postData = async (data) => {
    try {
      let response = await postForgotEmail({ Data: data });
      redirect("/verify-otp");
      if (response?.success === true) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOTP = () => {
    localStorage.setItem("email", Email);
    let data = {
      email: Email,
    };
    postData(data);
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Forgot password
      </Typography>
      <Box
        noValidate
        sx={{
          marginTop: 1,
          maxWidth: "360px",
          minWidth: "300px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          size="small"
        />
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs>
            <Button variant="contained" size="small" onClick={handleSendOTP}>
              {"Send OTP"}
            </Button>
          </Grid>

          <Grid item>
            <Link
              href="/signin"
              underline="none"
              variant="outlined"
              size="small"
            >
              {"Sign in"}
            </Link>
            <Grid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPassword;
