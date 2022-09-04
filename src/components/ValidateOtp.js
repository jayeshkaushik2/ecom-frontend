import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PostValidationOTP } from '../context/Apis'

export const ValidateOtp = (props) => {
    const [OTP, setOTP] = useState("")

    const postData = async (data) => {
        try {
            let response = await PostValidationOTP({ ValidateData: data })
            if (response != null) {
                localStorage.removeItem("email")
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
                        size="small"
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    <Grid container sx={{ marginTop: "10px" }}>
                        <Grid item xs>
                            <Button variant="contained" size="small">
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
