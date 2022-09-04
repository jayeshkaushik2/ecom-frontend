import React, { useContext } from 'react'
import Link from '@mui/material/Link';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export const Signin = (props) => {
  let { loginUser } = useContext(AuthContext)

  const handleLoginUser = (e) => {
    e.preventDefault()
    let data = {}
    data["username"] = document.getElementById("username").value
    data["password"] = document.getElementById("password").value
    loginUser(e, data)
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box noValidate sx={{ marginTop: 1, maxWidth: "360px", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="name"
          autoFocus
          size="small"
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
          size="small"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={(e) => handleLoginUser(e)}
          sx={{ marginTop: 3, marginBottom: 2 }}
          size="small"
        >
          Sign In <LoginIcon />
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="outlined" underline="none" href="/forgot-password" size="small">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="outlined" underline="none" href="/signup" size="small">
              {"Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Link
        href="/"
        variant="contained"
        underline="none"
        sx={{ marginTop: "15px" }}
      >Go to Home</Link>
    </>
  );
}