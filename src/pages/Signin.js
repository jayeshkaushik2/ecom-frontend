import React, { useContext } from 'react'
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
import LoginIcon from '@mui/icons-material/Login';
import AuthContext from '../context/AuthContext';


export const Signin = () => {
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
  }

  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center"></Typography>
      <Container maxWidth="xl" sx={{ backgroundImage: `url(${signin_img})`, height: "100vh", backgroundSize: "100% 100%", }}>

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
          <Avatar sx={{ padding: 1, marginTop: 10, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box noValidate sx={{ marginTop: 1, width: "70%", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="name"
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
            <FormControlLabel
              control={<Checkbox value="remember" name="remember" id="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => handleLoginUser(e)}
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign In <LoginIcon />
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={handleForgotPass} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}