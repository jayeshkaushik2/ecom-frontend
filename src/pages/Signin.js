import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
import SigninComp from '../components/SigninComp';
import ForgotPassword from '../components/ForgotPassword';


export const Signin = (props) => {
  const [Comp, setComp] = useState("signin")

  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center"></Typography>
      <Container sx={{ height: "100vh", backgroundSize: "100% 100%", maxWidth: "100%", paddingTop: "50px" }}>
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

        </Box>
      </Container>
    </>
  );
}