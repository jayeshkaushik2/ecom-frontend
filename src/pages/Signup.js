import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import { PostUserData } from '../context/Apis'
import AuthContext from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


export const Signup = (props) => {
    let redirect = useNavigate();
    let user = React.useContext(AuthContext);
    const [FirstName, setFirstName] = React.useState(null);
    const [LastName, setLastName] = React.useState(null);
    const [Username, setUsername] = React.useState(null);
    const [Email, setEmail] = React.useState(null);
    const [Password, setPassword] = React.useState(null);
    const [Password2, setPassword2] = React.useState(null);

    const postData = async (data) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            const resp_data = await PostUserData({ token: token, userData: data })
            alert("user created")
            redirect("/verify-newuser-otp")
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleSignUp = (e) => {
        e.preventDefault()
        if (Password !== Password2) {
            alert("your passwords are not matching!")
        }
        else {
            localStorage.setItem("email", Email)
            let data = {
                first_name: FirstName,
                last_name: LastName,
                email: Email,
                username: Username,
                password: Password,
            }
            postData(data)
        }
    }

    return (
        <>

            <Typography component="h1" variant="h5">
                Sign up
            </Typography>

            <Box component="form" noValidate sx={{ maxWidth: "360px", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoComplete="first_name"
                    autoFocus
                    size="small"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="last_name"
                    size="small"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    size="small"
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="conform_password"
                    size="small"
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{ marginTop: 3, marginBottom: 2 }}
                    onClick={(e) => handleSignUp(e)}
                >
                    Sign up  <LoginIcon />
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="signin" underline="none" size="small" variant="outlined">
                            {"Sign In?"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
