import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import profile_d from '../assets/images/profile_d.jpg'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import camera_icon from '../assets/images/camera_icon.png'
import { getProfileData, PostProfileData } from '../context/Apis'
import AuthContext from '../context/AuthContext'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import defaultprofile from '../assets/images/defaultprofile.jpg'
import ProfileInfo from '../components/ProfileInfo';
import ProfileDetail from '../components/ProfileDetail';

const Profile = () => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let user = React.useContext(AuthContext)
    const [userData, setUserData] = React.useState(null)
    const [Save, setSave] = React.useState(false)

    const handleBtnClick = () => {
        document.getElementById("imageUpload").click()
    }

    const postData = async (userData) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            if (token !== null && user.Login !== "Login" && user.AuthToken !== null) {
                const response_data = await PostProfileData({ token: token, userData: userData })
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            if (token !== null && user.Login !== "Login" && user.AuthToken !== null) {
                const data = await getProfileData({ token: token })
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


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Box style={{
                flexWrap: "wrap ",
                marginTop: "-10px",
                marginBottom: "70px",
            }}>
                <Box style={{ maxWidth: "100%", minHeight: "300px", marginTop: "10px", maxHeight: "300px", overflow: "hidden" }}>
                    {userData ?
                        <img
                            width="100%"
                            src={userData?.banner_image ? `${API_ENDPOINT}${userData.banner_image}` : defaultprofile}
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
                            {userData?.username ? userData.username : "Anonymous"}
                            <IconButton aria-label="edit" sx={{}} onClick={handleClickOpen}>
                                <EditIcon />
                            </IconButton>
                        </Typography>
                        <ProfileDetail handleClose={handleClose} open={open} userData={userData} setUserData={setUserData} />
                    </Box>
                    <Box sx={{ margin: "10px", width: "100%" }}>
                        <ProfileInfo />
                    </Box>
                </Box>
            </Box>
        </>
    );
}


export default Profile;