import React from 'react'
import defaultImage from '../assets/images/defaultImage.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Colors from './Colors.js'

const HomeHeader = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const LeftbuttonStyle = {
        position: 'absolute',
        top: '50%',
        left: '10px',
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    const RightbuttonStyle = {
        position: "absolute",
        top: "50%",
        right: "10px",
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    return (
        <Box id="promoted-subcategory" height="350px" sx={{ backgroundColor: "#fff4e0" }}>
            <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color:"white"}}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {props.HomepageData ? props.HomepageData["title"] : "Title"}
                </Typography>

                <Typography sx={{ textAlign: "center", color: "grey" }}>
                    {props.HomepageData ? props.HomepageData["description"] : "Description"}
                </Typography>
            </Box>

            {props.HomepageData ? props.HomepageData["images"].slice(0, 1).map((data) => (
                <Box key={data} height="inherit">
                    <img
                        width="100%"
                        src={data.image ? `${API_ENDPOINT}${data.image}` : defaultImage}
                        alt="homepage image"
                        height="350px"
                    />
                    <Button
                        type="btn"
                        variant="contained"
                        // onClick={(e) => handleLoginUser(e)}
                        sx={LeftbuttonStyle}>
                        <ArrowCircleLeftIcon />
                    </Button>
                    <Button
                        type="btn"
                        variant="contained"
                        // onClick={(e) => handleLoginUser(e)}
                        sx={RightbuttonStyle}>
                        <ArrowCircleRightIcon />
                    </Button>
                </Box>
            ))
                : ""}

        </Box >
    )
}

export default HomeHeader