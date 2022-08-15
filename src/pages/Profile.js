import React from 'react'
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import profile_d from '../assets/images/profile_d.jpg'
import Button from '@mui/material/Button';
import camera_icon from '../assets/images/camera_icon.png'



const Profile = () => {
  return (
    <>
      <container style={{
        display: "flex",
        flexWrap: "wrap ",
      }}>
        <Container style={{ maxWidth: "100%", height: "246px", backgroundColor: " rgb(172, 172, 172) ", marginTop: "10px" }}>Profile
        <Button
              type="submit"
              smallWidth
              variant=" text"
              sx={{
                marginTop: " 205px",
                width: "33px",
                float: " inline-end",
                borderRadius:"15px"
              }}
            >
              <img style={{ width: "34px", height: "30px",  }} src={camera_icon} alt="" />             
            </Button>
        </Container>
        <Stack direction="row" spacing={2} sx={{ width: 56, height: 56 }}>
          <Avatar style={{
            width: "130px",
            height: "130px",
            display: "flex",
            marginTop: "-72px",
            marginLeft: "32px",
          }} alt="Remy Sharp"
          >
            <img style={{
              width: "100%",
              position: "absolute"
            }}
              src={profile_d}
              alt="samsung"
              loading="lazy"
            />
            <Button
              type="submit"
              // smallWidth
              variant="text"
              style={{marginTop:"80px", borderRadius:"15px"}}
             
            >
              <img style={{ width: "33px" }} src={camera_icon} alt="" />
              {/* Sign In  */}
            </Button>
          </Avatar>
        </Stack>
        <Typography component="h1" variant="h5" style={{
          marginLeft: "125px",
          marginTop: "10px", display: "inline-block",
        }}>
          Aman Rajput
        </Typography>
        
      </container>
      {/* <Typography component="h1" variant="h5" style={{
          marginLeft: "125px",
          marginTop: "10px", display: "inline-block",
        }}>
          Edit your profile
        </Typography> */}
        
    </>
  );
}


export default Profile