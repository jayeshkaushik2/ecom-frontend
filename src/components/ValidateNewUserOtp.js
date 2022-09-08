import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PostValidationNewUserOtp, postForgotEmail } from '../context/Apis'
import { useNavigate } from 'react-router-dom';

export const ValidateNewUserOtp = (props) => {
    let redirect = useNavigate()
    const [OTP, setOTP] = useState("")

    const postData = async (data) => {
        try {
            let response = await PostValidationNewUserOtp({ ValidateData: data })
            if (response?.name !== null) {
                redirect("/signin")
            }
            else if (response?.success === false) {
                alert("invalid otp")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = () => {
        let email = localStorage.getItem("email")
        let data = {
            "OTP": OTP,
            "email": email
        }
        postData(data)
    }

    const postResendData = async (data) => {
        try {
            let response = postForgotEmail({ Data: data })
            if (response?.success === true) {
                alert("OTP resend successfully")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleResend = () => {
        let email = localStorage.getItem("email")
        let data = {
            "email": email
        }
        postResendData(data)
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    marginTop: "15",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingTop: "80px",
                }}
            >
                <Typography component="h1" variant="h5">
                    Enter OTP
                </Typography>
                <Box noValidate sx={{ marginTop: 1, maxWidth: "360px", minWidth: "300px", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="opt"
                        label="OTP"
                        name="otp"
                        type="password"
                        size="small"
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    <Grid container sx={{ marginTop: "10px" }}>
                        <Grid item xs>
                            <Button variant="contained" size="small" onClick={handleResend}>
                                {"Resent OTP"}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small" onClick={handleSubmit}>
                                {"Submit"}
                            </Button>
                            <Grid />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
