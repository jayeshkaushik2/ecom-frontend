import React from 'react'
import { Signup } from './Signup'
import { Signin } from './Signin';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ForgotPassword from '../components/ForgotPassword';
import { ValidateOtp } from '../components/ValidateOtp';

const Authentication = () => {
    const page = useParams("page").page
    return (
        <Box>
            <Box sx={{  Width: "100%", height:"81vh", backgroundColor: "#e3e3e3" }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                {page === "signin"? <Signin />: null}
                {page === "forgot-password"? <ForgotPassword />: null}
                {page === "signup"? <Signup />: null}
                {page === "verify-otp"? <ValidateOtp />: null}
                </Box>
            </Box>
        </Box>
    )
}

export default Authentication