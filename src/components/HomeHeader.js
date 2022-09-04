import React from 'react'
import defaultImage from '../assets/images/defaultImage.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const HomeHeader = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [CurrentImageIndex, setCurrentImageIndex] = React.useState(0)
    
    React.useEffect(() => {
        let interval = setInterval(() => {
            document.getElementById("right-btn").click()
        }, 5 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const handleRightImageClick = (e) => {
        if (CurrentImageIndex + 1 >= props.HomepageData?.images?.length) {
            setCurrentImageIndex(0)
        }
        if (CurrentImageIndex + 1 < props.HomepageData?.images?.length) {
            setCurrentImageIndex(CurrentImageIndex + 1)
        }
    }

    const handleLeftImageClick = (e) => {
        if (CurrentImageIndex - 1 <= -1) {
            setCurrentImageIndex(props.HomepageData?.images?.length - 1)
        }
        if (CurrentImageIndex - 1 > -1) {
            setCurrentImageIndex(CurrentImageIndex - 1)
        }
    }

    const LeftbuttonStyle = {
        position: 'absolute',
        top: '50%',
        left: '10px',
    }

    const RightbuttonStyle = {
        position: "absolute",
        top: "50%",
        right: "10px",
    }

    return (
        <Box id="promoted-subcategory" minHeight="500px" sx={{ backgroundColor: "#ffe6c1", maxHeight: "450px", overflow: "hidden" }}>
            {props.HomepageData !== null && props.HomepageData["images"]?.length > 0 ?
                <Box height="inherit">
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: `${props.HomepageData.images[CurrentImageIndex].is_dark === true? "white": "black" }` }}>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            {props.HomepageData?.title ? props.HomepageData.title : "Title"}
                        </Typography>

                        <Typography sx={{ textAlign: "center", }}>
                            {props.HomepageData?.description ? props.HomepageData.description : "Description"}
                        </Typography>
                    </Box>
                    <img
                        width="100%"
                        height="100%"
                        src={props.HomepageData["images"]?.length >= CurrentImageIndex ? `${API_ENDPOINT}${props.HomepageData["images"][CurrentImageIndex]?.image}` : defaultImage}
                        alt="homepage image"
                    />
                </Box>
                : null}
            <Button
                type="btn"
                variant="contained"
                onClick={(e) => handleLeftImageClick(e)}
                sx={LeftbuttonStyle}>
                <ArrowCircleLeftIcon />
            </Button>
            <Button
                type="btn"
                variant="contained"
                id="right-btn"
                onClick={(e) => handleRightImageClick(e)}
                sx={RightbuttonStyle}>
                <ArrowCircleRightIcon />
            </Button>

        </Box >
    )
}

export default HomeHeader