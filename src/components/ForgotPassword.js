import React, { useContext, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';

const ForgotPassword = (props) => {
    const handleResendOtp = () => {
        console.log("resend otp")
    }
    return (
        <>
            <Avatar sx={{ padding: 1, marginTop: 10, bgcolor: 'blue' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot password
            </Typography>
            <Box noValidate sx={{ marginTop: 1, maxWidth: "360px", minWidth:"300px", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                />
                <Grid container sx={{ marginTop: "10px" }}>
                    <Grid item xs>
                        <Button size="large" variant="contained" size="small">
                            {"Send OTP"}
                        </Button>

                    </Grid>

                    <Grid item>
                        <Button size="large" onClick={() => { props.setComp("signin") }} variant="outlined" size="small">
                            {"Sign in"}
                        </Button>
                        <Grid />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default ForgotPassword