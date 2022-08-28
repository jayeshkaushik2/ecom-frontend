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

const SigninComp = (props) => {
    let { loginUser } = useContext(AuthContext)
    const handleLoginUser = (e) => {
        e.preventDefault()
        let data = {}
        data["username"] = document.getElementById("username").value
        data["password"] = document.getElementById("password").value
        loginUser(e, data)
    }

    const handleForgotPass = () => {
        console.log("send opt to user email...")
        props.setComp("forgot_password")
    }

    return (
        <>
            <Avatar sx={{ padding: 1, marginTop: 10, bgcolor: 'blue' }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box noValidate sx={{ marginTop: 1, maxWidth: "360px", backgroundColor:"white", padding: "15px", borderRadius: "10px", }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="name"
                    autoFocus
                    size="small"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e) => handleLoginUser(e)}
                    sx={{ marginTop: 3, marginBottom: 2 }}
                    size="small"
                >
                    Sign In <LoginIcon />
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Button variant="outlined" onClick={handleForgotPass} size="small">
                            Forgot password?
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => props.setAuthPage("signup")} size="small">
                            {"Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SigninComp