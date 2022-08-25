import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import profile_d from '../assets/images/profile_d.jpg'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import camera_icon from '../assets/images/camera_icon.png'
import { getUserData, PostUserData } from '../context/Apis'
import AuthContext from '../context/AuthContext'

const Profile = () => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let user = React.useContext(AuthContext)
    const [userData, setUserData] = React.useState(null)
    const [ProfileImage, setProfileImage] = React.useState(null)
    const [Save, setSave] = React.useState(false)

    const handleBtnClick = () => {
        document.getElementById("imageUpload").click()
    }

    const postData = async (userData) => {
        try {
            console.log("running profile api...", userData)
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            if (token !== null && user.Login !== "Login" && user.AuthToken !== null) {
                const response_data = await PostUserData({ token: token, userData: userData })
                console.log("data got user-profile, ", response_data)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleProfileEdit = () => {
        const post_userData = new FormData();
        console.log("profile image", ProfileImage)
        post_userData.append('post_image', ProfileImage, ProfileImage.name)
        console.log("posting data", post_userData)
        postData(post_userData)
    }

    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
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
                <Box style={{ maxWidth: "100%", minHeight: "300px", backgroundColor: "rgb(172, 172, 172) ", marginTop: "10px", maxHeight: "300px", overflow: "hidden" }}>
                    {userData ?
                        <img
                            width="100%"
                            src={userData?.banner_image ? `${API_ENDPOINT}${userData.banner_image}` : null}
                            alt="homepage image"
                            height="100%"
                        />
                        : null}
                </Box>

                <Box sx={{ display: "flex", margin: "10px" }}>
                    <Box sx={{ margin: "10px", marginTop: "-100px" }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar style={{
                                width: "200px",
                                height: "200px",
                                display: "flex",
                                boxShadow: "3px 3px 6px grey",
                            }}>
                                <img style={{ width: "100%", position: "absolute" }}
                                    src={userData?.profile_image ? `${API_ENDPOINT}${userData.profile_image}` : profile_d}
                                    alt="profile image"
                                    loading="lazy" />
                            </Avatar>
                        </Stack>
                        <Typography component="h1" variant="h5" style={{ textAlign: "center", marginTop: "10px" }}>
                            {userData?.name ? userData.name : "Anonymous"}
                        </Typography>
                        <Typography style={{ textAlign: "center", marginTop: "10px" }}>
                            This is the about section.
                        </Typography>

                        {/* <Typography style={{ textAlign: "", marginTop: "10px" }}>
                            Phone: 9090909090
                        </Typography>

                        <Typography style={{ textAlign: "", marginTop: "10px" }}>
                            Email: new@gmail.com
                        </Typography> */}
                    </Box>

                    <Box sx={{ margin: "10px" }}>
                        Your orders,
                        Your profile info
                    </Box>
                </Box>
            </Box>
        </>
    );
}


export default Profile;


{/* <Button type="submit"
                            variant="text"
                            onClick={handleBtnClick}
                            style={{ marginTop: "80px", borderRadius: "15px" }}>
                            <img style={{ width: "33px" }} src={camera_icon} alt="" />
                        </Button>
                        <Input type="file" id="imageUpload" accept="image/*" style={{ display: "none" }} onChange={(e) => setProfileImage(e.target.files[0])}></Input> */}

                //         <Button variant="contained" disabled={Save} onClick={handleProfileEdit}>
                //     Save
                // </Button>