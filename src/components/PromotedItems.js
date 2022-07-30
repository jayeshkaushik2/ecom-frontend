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
        <Box sx={{ marginTop: '40px', marginBottom: '40px',  maxWidth: "100%" }} id="promoted-items">
            <Grid container id="grid-id" spacing={{ xs: 1, md: 4, marginLeft: "auto" }} columns={{ xs: 2, sm: 6, md: 12 }}>
                {Product?.map((data, index) => (
                    <Grid item xs={2} sm={4} md={4} mb={1} key={index}>
                        <PromotedItemCard product={data} />
                    </Grid>
                ))}
            </Grid>
            {/* {Product ? <Button variant="contained" sx={buttonStyle} onClick={(e) => handleViewAll(e)}>View All Items <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button> : ""} */}
        </Box>
    );
}



export default PromotedItems