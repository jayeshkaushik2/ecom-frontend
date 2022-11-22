import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import {postUpdatedPasswordData} from '../context/Apis'

export const ChangePassword = () => {
    let redirect = useNavigate()
    const [Password, setPassword] = React.useState("");
    const [ConfirmPassword, setConfirmPassword] = React.useState("");

    const postData = async (data) => {
        let response = await postUpdatedPasswordData({updatedPassword:data})
        if (response?.success === true){
            alert("your password has been changed")
            localStorage.removeItem("email")
            redirect("/signin")
        }
        else {
            console.log("got error")
        }
    }

    const handleSubmit = () => {
        if (Password === null || Password ==="" || Password !== ConfirmPassword){
            alert("Entered passwords are not valid")
        }
        let PostKey = localStorage.getItem("post_key")
        let email = localStorage.getItem("email")
        let data = {
            password: Password,
            confirm_password: ConfirmPassword,
            post_key: PostKey,
            email: email,
        }
        postData(data)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: "15",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingTop: "80px",
                }}
            >
                <Typography component="h1" variant="h5">
                    Enter OTP
                </Typography>
                <Box noValidate sx={{ marginTop: 1, maxWidth: "360px", minWidth: "300px", backgroundColor: "white", padding: "15px", borderRadius: "10px", }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="new_password"
                        label="Enter new password"
                        name="new_password"
                        size="small"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirm_new_password"
                        label="Confirm new password"
                        name="confirm_new_password"
                        size="small"
                        type="password"
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />
                    <Grid container sx={{ marginTop: "10px", width:"100%" }}>
                        <Grid sx={{ width:"100%" }}>
                            <Button sx={{ width:"100%" }} variant="contained" onClick={handleSubmit}>
                                {"Submit"}
                            </Button>
                            <Grid />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
