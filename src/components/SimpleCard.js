import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductImage from '../assets/images/ProductImage.png'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box';
import { PostCartRefData } from "../context/Apis"
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import Notifications from '../context/Notifications.js';



const SimpleCard = (props) => {
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)


    const postCartLineData = async (lineData) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await PostCartRefData({ token: token, ref: ref, lineData: { lines: [lineData] } })
            props.setShowMsg({ show: true, type: "success", msg: "item added to cart" })
            props.getNumProduct()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePostCartData = (e) => {
        // get ref, cart_id,
        let dataIs = {
            cart: cart?.cart_id,
            product: e.target.value,
            ref: cart?.cartRef,
        }
        postCartLineData(dataIs)
    }

    const handleBuyNow = () => {
        props.setPage("checkout")
    }

    return (
        <Card sx={{ maxWidth: "95%", marginLeft: "10px" }} >
            <Box style={{ maxWidth: "100%", minWidth: "100px", width: "100%" }}>
                <CardMedia
                    component="img"
                    style={{ width: "100%", Height: "100%" }}
                    image={props.product.images?.length > 0 ? props.product.images[0]["image"] : ProductImage}
                    alt="green iguana"
                    sx={{ objectFit: "contain" }}
                />
            </Box>

            <CardContent>
                <Box sx={{ display: "flex" }}>
                    <Button size="small" variant="contained" onClick={handleBuyNow}>
                        Buy now<ShoppingCartIcon />
                    </Button>
                    <Button size="small" variant="outlined"
                        value={props.product.id}
                        onClick={handlePostCartData} sx={{
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

                <Button size="small" variant="text" sx={{ marginLeft: 'auto' }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
            </CardContent>
        </Card>
    );
}

export default SimpleCard;