import React from 'react'
import { Signup } from './Signup'
import { Signin } from './Signin';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ForgotPassword from '../components/ForgotPassword';
import { ValidateOtp } from '../components/ValidateOtp';
import { ChangePassword } from '../components/ChangePassword';
import { ValidateNewUserOtp } from '../components/ValidateNewUserOtp';

const Authentication = () => {
    const page = useParams("page").page
    return (
        <Box>
            <Box sx={{  Width: "100%", height:"100vh", backgroundColor: "#e3e3e3", marginBottom:"-40px" }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
                    }}
                >
                {page === "signin"? <Signin />: null}
                {page === "forgot-password"? <ForgotPassword />: null}
                {page === "signup"? <Signup />: null}
                {page === "verify-otp"? <ValidateOtp />: null}
                {page === "verify-newuser-otp"? <ValidateNewUserOtp />: null}
                {page === "change-password"? <ChangePassword />: null}
                </Box>
            </Box>
        </Box>
    )
}

export default Authentication