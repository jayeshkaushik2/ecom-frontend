import React from 'react'
import defaultImage from '../assets/images/defaultImage.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Colors from './Colors.js'
import { getHomepageData } from '../context/Apis'


const HomeHeader = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const [HomepageData, setHomepageData] = React.useState(null)

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
    }, [])

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
        <Box id="promoted-subcategory" minHeight="300px" sx={{ backgroundColor: "#fff4e0" }}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {HomepageData ? HomepageData["title"] : "Title"}
                </Typography>

                <Typography sx={{ textAlign: "center", color: "grey" }}>
                    {HomepageData ? HomepageData["description"] : "Description"}
                </Typography>
            </Box>

            {HomepageData ? HomepageData["images"].slice(0, 1).map((data) => (
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
                : null}

        </Box >
    )
}

export default HomeHeader