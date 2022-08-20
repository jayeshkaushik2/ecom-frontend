import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Colors from './Colors.js'
import defaultImage from '../assets/images/defaultImage.png'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box';
import { PostCartRefData } from "../context/Apis"
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'



const SimpleCard = (props) => {
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const buttonStyle = {
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    const postCartLineData = async (lineData) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await PostCartRefData({ token: token, ref: ref, lineData: { lines: [lineData] } })
            alert("product added to cart")
            props.getNumProduct()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePostCartData = (e) => {
        // get ref, cart_id,
        console.log("adding to cart...", e.target.value)
        let dataIs = {
            cart: cart?.cart_id,
            product: e.target.value,
            ref: cart?.cartRef,
        }
        console.log("data have to post", dataIs)
        postCartLineData(dataIs)
    }

    return (
        <Card sx={{ maxWidth: "95%", marginLeft: "10px" }} >
            <Box style={{ maxWidth: "100%", minWidth: "100px", width: "100%" }}>
                <CardMedia
                    component="img"
                    width="100%"
                    style={{ maxHeight: "250px", minHeight: "250px" }}
                    image={props.product.images?.length > 0 ? props.product.images[0]["image"] : defaultImage}
                    alt="green iguana"
                    sx={{ objectFit: "contain" }}
                />
            </Box>

            <CardContent>
                <Box sx={{ display: "flex" }}>
                    <Button size="small" variant="contained" sx={buttonStyle}>
                        Buy now<ShoppingCartIcon />
                    </Button>
                    <Button size="small" variant="outlined"
                        value={props.product.id}
                        onClick={handlePostCartData} sx={{
                            color: main_color, '&:hover': {
                                color: main_color_dark
                            },
                            marginLeft: "30px",
                        }}>
                        Add to cart<ShoppingCartIcon />
                    </Button>
                </Box>

                <Typography variant="h6" sx={{
                    borderRadius: "5px",
                    width: "fit-content",
                    paddingTop: "10px",
                    paddingBottom: "5px",
                    color: "grey",
                }}>
                    Price:{props.product.price}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
                    <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
                </Typography>

                <Typography style={{ padding: "0px" }}>
                    {props.product.description?.length > 100 ? (
                        props.product.description.slice(0, 100)
                    )
                        : props.product.description}
                </Typography>

                <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
            </CardContent>


            {/* <CardContent style={{ display: "flex", paddingBottom: "0", marginBottom: "0" }}>
                <Typography gutterBottom variant="h5" component="div" style={{ paddingBottom: "0", marginBottom: "0" }}>
                    {props.product.title.slice(0, 30)}
                </Typography>
            </CardContent>

            <CardContent sx={{ display: "flex" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ margin: '0', fontSize: "17px" }}>
                    Price: {props.product.price}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
                </Typography>
                <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained" value={props.product.id} onClick={(e) => handlePostCartData(e)} sx={buttonStyle}>Add to cart <ShoppingCartIcon /></Button>
                <Link href="#" underline="none" color="inherit">
                    <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View details<ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
                </Link>
            </CardActions> */}
        </Card>
    );
}

export default SimpleCard;