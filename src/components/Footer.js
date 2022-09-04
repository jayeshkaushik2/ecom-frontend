import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from '@mui/material/Link';
import defaultImage from '../assets/images/defaultImage.png'
import TextField from '@mui/material/TextField'
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


    const buttonStyle = {
        fontSize: "18px", marginTop: "10px", float: "right"
    }

    const containerStyle = { width: "fit-content", float: "left", margin: "10px", }

    const footerStyle = {
        color: "#fff",
        height: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#0d77b9",
        textAlign: "center",
        minHeight: "200px",
    }

    return (
        <Box style={footerStyle}>
            <Box sx={{ marginTop: "40px", marginBottom: "30px", color: "white" }}>
                <Container sx={containerStyle}>
                    <Typography varient="h6" sx={{ fontWeight: "bold" }}>
                        EcomBUY
                    </Typography>
                    {props.FooterData !== null && props.FooterData?.logo !== null ?
                        <Typography>
                            <img
                                width="45px"
                                src={`${API_ENDPOINT}${props.FooterData.logo}`}
                                alt="Logo"
                            />
                        </Typography>
                        : null}

                </Container>

                <Container sx={containerStyle}>
                    {props.FooterData !== null && props.FooterData?.contact !== null ?
                        <Typography varient="h6" sx={{ fontWeight: "bold" }}>
                            Contact us
                        </Typography>
                        : ""}

                    <Typography>
                        {props.FooterData ? props.FooterData.email : ""}
                        <br />
                        {props.FooterData ? props.FooterData.contact : ""}
                        <br />
                        {props.FooterData ? props.FooterData.alternate1_contact : ""}
                        <br />
                        {props.FooterData ? props.FooterData.alternate2_contact : ""}
                    </Typography>
                </Container>

                <Container sx={{ margin: "10px", width: "fit-content", float: "right" }}>
                    <TextField
                        sx={{}}
                        id="outlined-required"
                        label="Email"
                        variant="outlined"
                        size="small"
                    />
                    <br />
                    <Button size="small" variant="contained" sx={buttonStyle}>Subscribe</Button>
                </Container>

                <Container sx={{ width: "fit-content", float: "right", margin: "10px", }}>
                    {props.FooterData !== [] && props.FooterData?.founders?.length > 0 ?
                        <Typography varient="h6" sx={{ fontWeight: "bold" }}>
                            Founders
                        </Typography> : ""}

                    {props.FooterData ? props.FooterData.founders?.map((data, index) => (
                        <Typography key={index}>
                            {data["name"]} {data["profession"]}
                            <br />
                        </Typography>
                    )) : ""}
                </Container>

            </Box>

            <Box>
                {props.FooterData !== null && props.FooterData?.twitter_link !== null ?
                    <Link target="_blank" href={props.FooterData.twitter_link} >
                        <TwitterIcon style={{ color: "white", marginRight: "25px", marginTop: "10px" }} />
                    </Link>
                    : ""}

                {props.FooterData !== null && props.FooterData?.facebook_link !== null ?
                    <Link target="_blank" href={props.FooterData.facebook_link} >
                        <FacebookIcon style={{ color: "white", marginRight: "25px", marginTop: "10px" }} />
                    </Link>
                    : ""}

                {props.FooterData !== null && props.FooterData?.instagram_link !== null ?
                    <Link target="_blank" href={props.FooterData.instagram_link} >
                        <InstagramIcon style={{ color: "white", marginRight: "25px", marginTop: "10px" }} />
                    </Link>
                    : ""}

                {props.FooterData !== null && props.FooterData?.youtube_link !== null ?
                    <Link target="_blank" href={props.FooterData.youtube_link} >
                        <YouTubeIcon style={{ color: "white", marginTop: "10px" }} />
                    </Link>
                    : ""}
            </Box>
        </Box >
    )
}
