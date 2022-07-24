import React from 'react'
import defaultImage from '../assets/images/defaultImage.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signin_img from '../assets/images/signin_img.jpg'
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import AuthContext from '../context/AuthContext';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Colors from './Colors.js'

const PromotedSubCategory = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const LeftbuttonStyle = {
        position: 'absolute',
        top: '40%',
        left: '10px',
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    const RightbuttonStyle = {
        position: "absolute",
        top: "40%",
        right: "10px",
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    return (
        <Box id="promoted-subcategory">
            {
                props.promoted_sub_cateData?.map((data) => (
                    <Box key={data}>
                        <img
                            width="100%"
                            src={data.image? data.image : defaultImage}
                            alt="green iguana"
                            height="300px"
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
            }
        </Box >
    )
}

export default PromotedSubCategory