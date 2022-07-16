import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';

export const Signin = () => {
    return (
        <>
            <Container maxWidth="xl" sx={{ backgroundImage: `url(${signin_img})`, height: "100vh", backgroundSize: "100% 100%" }}>
               
            </Container>
        </>
    );
}