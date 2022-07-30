import React from 'react'
import { Grid, } from '@mui/material';
import Container from '@mui/material/Container';
import PromotedItemCard from './PromotedItemCard';
import Colors from './Colors.js'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';


const PromotedItems = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")
    const [Product, setProduct] = React.useState(null)
    let navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: main_color,
        mt: "15px",
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    const handleViewAll = (e) => {
        e.preventDefault()
        console.log("working button")
        navigate("/items", { ProductData: props.productData ? props.productData : null })
    }

    const getProduct = async () => {
        let response = await fetch(`${API_ENDPOINT}/product/?is_promoted=true`)
        let data = await response.json()
        setProduct(data["results"].slice(0, 6))
    }

    React.useEffect(() => {
        getProduct()
    }, [])

    return (


        <Box sx={{ marginTop: '40px', marginBottom: '40px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
{/* 
            <Box sx={{  }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index} sx={{backgroundColor:"grey"}}>
                        </Grid>
                    ))}
                </Grid>
            </Box> */}


            <Grid container id="grid-id" spacing={{ xs: 2, md: 3, marginLeft: "auto" }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {Product?.map((data, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <PromotedItemCard product={data} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}



export default PromotedItems