import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Signup = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ backgroundImage: `url(${signin_img})`, height: "100%", backgroundSize: "100% 100%" }}>

        <Box
          component="form"
          sx={{
            marginTop: "15",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "25%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Avatar sx={{ padding: 1, marginTop: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ marginTop: 1, width: "24vw", backgroundColor: "white", padding: "15px", borderRadius: "10px", marginBottom:"15px",}}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="conform_password"
              label="Conform Password"
              type="password"
              id="conform_password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Sign In?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </>
  );
}
