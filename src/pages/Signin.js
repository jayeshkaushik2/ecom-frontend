import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
import SigninComp from '../components/SigninComp';
import ForgotPassword from '../components/ForgotPassword';


export const Signin = (props) => {
  const [Comp, setComp] = useState("signin")

  return (
    <Box>
      <Box sx={{ height: "100vh", Width: "100%", backgroundColor: "#e3e3e3", paddingTop: "50px" }}>
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
          }}
        >
          {Comp === "signin" ?
            <SigninComp setComp={setComp} setAuthPage={props.setAuthPage} />
            : null}

          {Comp === "forgot_password" ?
            <ForgotPassword setComp={setComp} />
            : null}

          <Link
            href="/"
            variant="contained"
            sx={{ marginTop: "15px" }}
          >Go to Home</Link>

        </Box>
      </Box>
    </Box>
  );
}