import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import profile_d from "../assets/images/profile_d.jpg";
import { getProfileData } from "../context/Apis";
import AuthContext from "../context/AuthContext";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import defaultprofile from "../assets/images/defaultprofile.jpg";
import ProfileInfo from "../components/ProfileInfo";
import ProfileDetail from "../components/ProfileDetail";

const Profile = () => {
  let user = React.useContext(AuthContext);
  const [userData, setUserData] = React.useState(null);

  const getData = async () => {
    try {
      let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null;
      if (token !== null && user.Login !== "Login" && user.AuthToken !== null) {
        const data = await getProfileData({ token: token });
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Box
        style={{
          flexWrap: "wrap ",
          marginTop: "-10px",
          marginBottom: "70px",
        }}
      >
        <Box
          style={{
            maxWidth: "100%",
            minHeight: "300px",
            marginTop: "10px",
            maxHeight: "300px",
            overflow: "hidden",
          }}
        >
          {userData ? (
            <img
              width="100%"
              src={
                userData?.banner_image
                  ? `${userData.banner_image}`
                  : defaultprofile
              }
              alt="homepage"
              height="100%"
            />
          ) : null}
        </Box>

        <Box sx={{ display: "flex", margin: "10px" }}>
          <Box sx={{ margin: "10px", marginTop: "-100px" }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  boxShadow: "3px 3px 6px grey",
                }}
              >
                <img
                  style={{ width: "100%", position: "absolute" }}
                  src={
                    userData?.profile_image
                      ? `${userData.profile_image}`
                      : profile_d
                  }
                  alt="profile"
                  loading="lazy"
                />
              </Avatar>
            </Stack>
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              {userData?.username ? userData.username : "Anonymous"}
              <IconButton aria-label="edit" sx={{}} onClick={handleClickOpen}>
                <EditIcon />
              </IconButton>
            </Typography>
            <ProfileDetail
              handleClose={handleClose}
              open={open}
              userData={userData}
              setUserData={setUserData}
            />
          </Box>
          <Box sx={{ margin: "10px", width: "100%" }}>
            <ProfileInfo />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
