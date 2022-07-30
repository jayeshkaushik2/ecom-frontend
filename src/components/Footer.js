import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Colors from './Colors.js'
import CopyrightIcon from '@mui/icons-material/Copyright';
import Link from '@mui/material/Link';


export const Footer = () => {
  const main_color = Colors("main_color")
  const main_color_dark = Colors("main_color_dark")

  const buttonStyle = {
    backgroundColor: main_color,
    '&:hover': {
      backgroundColor: main_color_dark
    }
  }
  return (
    <Box style={{
      textAlign: "center",
      backgroundColor: "#26c6da",
      position: "sticky",
      bottom: "0",
    }}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#26c6da', color: 'white', bottom: '0', }} style={{
        display: "flex", flexWrap: "wrap",
        fontSize: "larger", height: "260px",
        position: "sticky",
      }}>
        <container style={{ margin: "auto" }}>
          <Typography varient="body1" style={{
            marginBottom: "5px", fontSize: "1.20rem", fontWeight: "bold", marginTop: "-25px"
          }}>EcomBUY</Typography>
          <li style={{
            listStyle: "none",
          }}>logo</li>
        </container>
        <container style={{ margin: "auto" }}>
          <Typography varient="body1" style={{
            marginBottom: "5px", fontSize: "1.20rem", fontWeight: "bold",
            textTransform: "uppercase",
          }}>Contact Us</Typography>
          <li style={{
            listStyle: "none",
          }}>+999999999</li>
          <li style={{
            listStyle: "none",
          }}>ecombuy.com </li>
        </container>
        <container style={{ margin: "auto" }}>
          <Typography varient="body1" style={{
            marginBottom: "5px", fontSize: "1.20rem", fontWeight: "bold",
            textTransform: "uppercase",
          }}>Founder</Typography>
          <li style={{
            listStyle: "none",
          }}>Jayesh Kaushik </li>
          <li style={{
            listStyle: "none",
          }}>Aman Rajput </li>
        </container>
        <container style={{ margin: "auto", }}>
          <Typography varient="body1"  >
            <TextField style={{
              backgroundColor: "white",
              borderRadius: "10px ",

            }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size='small'
            />
          </Typography>
          <Button style={{
            marginTop: "13px", display: "flex", borderRadius: "11px ", width: " 222px",
            height: "37px", fontSize: "large",
          }} size="small" variant="contained" sx={buttonStyle}>Subscribe NOW</Button>
        </container>
      </Container>
      <hr style={{ marginBottom: "13px", width: "80vw", backgroundColor: "white", marginTop: "13px", }} />
      <container style={{}}>


        <Link href="/Twitter" >
          <TwitterIcon style={{ color: "white", marginRight: "25px", marginTop: "10px" }} />
        </Link>

        <Link href="/Facebook" >
          <FacebookIcon style={{ color: "white", marginRight: "25px", marginTop: "10px" }} />
        </Link>


        <Link href="/Instagram" >
          <InstagramIcon style={{ color: "white", marginTop: "10px" }} />
        </Link>

        <container style={{ display: "flex", justifyContent: "center", height: "60px", marginTop: " 13px", color: "white", fontSize: "larger", }}>
          Copyright <CopyrightIcon />  All Rights Reserved
        </container>
      </container>
    </Box >
  )
}
