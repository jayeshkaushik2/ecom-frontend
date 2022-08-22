import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import profile_d from '../assets/images/profile_d.jpg'
import Button from '@mui/material/Button';
import camera_icon from '../assets/images/camera_icon.png'
import { getUserData } from '../context/Apis'
import AuthContext from '../context/AuthContext'

const Profile = () => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let user = React.useContext(AuthContext)
    const [userData, setUserData] = React.useState(null)

    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            console.log(token, user.Login, user.AuthToken)
            if (token !== null && user.Login !== "Login" && user.AuthToken !== null) {
                const data = await getUserData({ token: token })
                setUserData(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Box style={{
                flexWrap: "wrap ",
                marginTop: "-10px",
                marginBottom: "70px",
            }}>
                <Box style={{ maxWidth: "100%", height: "246px", backgroundColor: "rgb(172, 172, 172) ", marginTop: "10px" }}>
                    {userData ?
                        <img
                            width="100%"
                            src={userData?.banner_image ? `${API_ENDPOINT}${userData.banner_image}` : null}
                            alt="homepage image"
                            height="246px"
                        />
                        : null}
                </Box>
                <Stack direction="row" spacing={2} sx={{ width: 56, height: 56 }}>
                    <Avatar style={{
                        width: "120px",
                        height: "120px",
                        display: "flex",
                        marginTop: "-50px",
                        marginLeft: "30px",
                        border: "5px solid",
                        boxShadow: "4px 3px 6px grey",
                    }} alt="Remy Sharp"
                    >
                        <img style={{ width: "100%", position: "absolute" }}
                            src={userData?.profile_image ? `${API_ENDPOINT}${userData.profile_image}` : profile_d}
                            alt="profile image"
                            loading="lazy" />
                        <Button type="submit"
                            variant="text"
                            style={{ marginTop: "80px", borderRadius: "15px" }}>
                            <img style={{ width: "33px" }} src={camera_icon} alt="" />
                        </Button>
                    </Avatar>
                </Stack>
                <Typography component="h1" variant="h5" style={{ textAlign: "center", marginTop: "-50px", marginLeft: "100px" }}>
                    {userData?.name ? userData.name : "Anonymous"}
                </Typography>

            </Box>
        </>
    );
}


export default Profile;