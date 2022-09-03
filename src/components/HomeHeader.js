import React from 'react'
import defaultImage from '../assets/images/defaultImage.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getHomepageData } from '../context/Apis'


const HomeHeader = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const [HomepageData, setHomepageData] = React.useState(null)
    const [CurrentImageIndex, setCurrentImageIndex] = React.useState(0)
    const getData = async () => {
        try {
            const data = await getHomepageData()
            setHomepageData(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
        let interval = setInterval(() => {
            document.getElementById("right-btn").click()
        }, 5 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const handleRightImageClick = (e) => {
        if (CurrentImageIndex + 1 >= HomepageData?.images?.length) {
            setCurrentImageIndex(0)
        }
        if (CurrentImageIndex + 1 < HomepageData?.images?.length) {
            setCurrentImageIndex(CurrentImageIndex + 1)
        }
    }

    const handleLeftImageClick = (e) => {
        if (CurrentImageIndex - 1 <= -1) {
            setCurrentImageIndex(HomepageData?.images?.length - 1)
        }
        if (CurrentImageIndex - 1 > -1) {
            setCurrentImageIndex(CurrentImageIndex - 1)
        }
    }

    const LeftbuttonStyle = {
        position: 'absolute',
        top: '40%',
        left: '10px',
    }

    const RightbuttonStyle = {
        position: "absolute",
        top: "40%",
        right: "10px",
    }

    return (
        <Box id="promoted-subcategory" minHeight="300px" sx={{ maxHeight: "450px", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {HomepageData ? HomepageData["title"] : "Title"}
                </Typography>

                <Typography sx={{ textAlign: "center", color: "grey" }}>
                    {HomepageData ? HomepageData["description"] : "Description"}
                </Typography>
            </Box>

            {HomepageData !== null && HomepageData["images"]?.length > 0 ?
                <Box height="inherit">
                    <img
                        width="100%"
                        height="100%"
                        src={HomepageData["images"]?.length >= CurrentImageIndex ? `${API_ENDPOINT}${HomepageData["images"][CurrentImageIndex]?.image}` : defaultImage}
                        alt="homepage image"
                    />
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
                </Box>
                : null}

        </Box >
    )
}

export default HomeHeader