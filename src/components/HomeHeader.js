// import React from 'react'
// import defaultImage from '../assets/images/defaultImage.png'
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import Colors from './Colors.js'
// import { getHomepageData } from '../context/Apis'



import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const HomeHeader = (props) => {


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );










    // let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    // const main_color = Colors("main_color")
    // const main_color_dark = Colors("main_color_dark")

    // const [HomepageData, setHomepageData] = React.useState(null)

    // const getData = async () => {
    //     try {
    //         const data = await getHomepageData()
    //         setHomepageData(data)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // React.useEffect(() => {
    //     getData()
    // }, [])

    // const LeftbuttonStyle = {
    //     position: 'absolute',
    //     top: '40%',
    //     left: '10px',
    //     backgroundColor: main_color,
    //     '&:hover': {
    //         backgroundColor: main_color_dark
    //     }
    // }

    // const RightbuttonStyle = {
    //     position: "absolute",
    //     top: "40%",
    //     right: "10px",
    //     backgroundColor: main_color,
    //     '&:hover': {
    //         backgroundColor: main_color_dark
    //     }
    // }

    // return (
    //     <Box id="promoted-subcategory" minHeight="300px" sx={{ backgroundColor: "#fff4e0" }}>
    //         <Box sx={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
    //             <Typography variant="h5" sx={{ textAlign: "center" }}>
    //                 {HomepageData ? HomepageData["title"] : "Title"}
    //             </Typography>

    //             <Typography sx={{ textAlign: "center", color: "grey" }}>
    //                 {HomepageData ? HomepageData["description"] : "Description"}
    //             </Typography>
    //         </Box>

    //         {HomepageData ? HomepageData["images"].slice(0, 1).map((data) => (
    //             <Box key={data} height="inherit">
    //                 <img
    //                     width="100%"
    //                     src={data.image ? `${API_ENDPOINT}${data.image}` : defaultImage}
    //                     alt="homepage image"
    //                     height="350px"
    //                 />
    //                 <Button
    //                     type="btn"
    //                     variant="contained"
    //                     // onClick={(e) => handleLoginUser(e)}
    //                     sx={LeftbuttonStyle}>
    //                     <ArrowCircleLeftIcon />
    //                 </Button>
    //                 <Button
    //                     type="btn"
    //                     variant="contained"
    //                     // onClick={(e) => handleLoginUser(e)}
    //                     sx={RightbuttonStyle}>
    //                     <ArrowCircleRightIcon />
    //                 </Button>
    //             </Box>
    //         ))
    //             : null}

    //     </Box >
    // )
}

export default HomeHeader