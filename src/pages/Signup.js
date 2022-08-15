import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
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


export const Signup = () => {
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
            //TODO have to add a opt authentication system for new users
            redirect("/signin")
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
            <Container maxWidth="xl" sx={{ backgroundImage: `url(${signin_img})`, height: "100%", backgroundSize: "100% 100%" }}>

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
                    <Avatar sx={{ padding: 1, marginTop: 1, bgcolor: 'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Box component="form" noValidate sx={{ marginTop: 1, maxWidth: "360px", backgroundColor: "white", padding: "15px", borderRadius: "10px", marginBottom: "15px", }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            autoComplete="first_name"
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                            onClick={(e) => handleSignUp(e)}
                        >
                            Sign up  <LoginIcon />
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signin" variant="body2">
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
