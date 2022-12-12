import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import CartLine from "./CartLine";
import { Box } from "@mui/system";
import NoDataFound from "../pages/NoDataFound";
import TextField from "@mui/material/TextField";
import { PostProfileData } from "../context/Apis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProfileDetail(props) {
  const [ProfileImage, setProfileImage] = React.useState(null);
  const [BannerImage, setBannerImage] = React.useState(null);
  const [Username, setUsername] = React.useState("");
  let user = React.useContext(AuthContext);
  let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null;

  const handleProfileEdit = () => {
    const post_userData = new FormData();
    post_userData.append("post_image", ProfileImage, ProfileImage.name);
  };

  const handleProfileUpdate = async () => {
    try {
      let data = {
        username: Username,
        profile_image: ProfileImage,
        banner_image: BannerImage,
      };
      if (ProfileImage !== null) {
        data["profile_image"] = ProfileImage;
      }
      if (BannerImage !== null) {
        data["banner_image"] = BannerImage;
      }
      const response = await PostProfileData({ token: token, userData: data });
      props.setUserData(response);
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <input
            type="file"
            lable="upload profile image"
            onChange={(e) => setProfileImage(e.target.value)}
          ></input>
          <input
            type="file"
            lable="upload profile image"
            onChange={(e) => setBannerImage(e.target.value)}
          ></input>
          {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                    /> */}
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            value={props?.userData?.name ? props?.userData?.username : null}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <DialogActions>
            <Button onClick={props.handleClose}>Close</Button>
            <Button onClick={handleProfileUpdate}>Save Changes</Button>
          </DialogActions>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
