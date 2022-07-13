import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';

export const Signup = () => {
  return (
    <>
      <Container maxWidth="xl"  sx={{backgroundImage: `url(${signin_img})`, height:"100vh", backgroundSize: "100% 100%"}}>


        <Box
          component="form"
          sx={{
            display: "flex",
            display: "grid",
            justifyContent: "center",
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="Enter Name"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <Button variant="contained">Contained</Button>
          <Button variant="text" sx={{ backgroundColor: "red", }}>Text</Button>

        </Box>
      </Container>
    </>
  );
}