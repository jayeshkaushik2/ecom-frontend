import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductImage from '../assets/images/ProductImage.png'
import { PostCartRefData } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ItemCard = (props) => {
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const postCartLineData = async (lineData) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await PostCartRefData({ token: token, ref: ref, lineData: { lines: [lineData] } })
            alert("product added to cart")
            props.getNumProduct()
            // props.getUpdatedData()
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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    const handleBuyNow = () => {
        
    }


    return (
        <Box id="promoted-items">
            <Card sx={{ maxWidth: "95%", marginLeft: "10px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={props.product.images?.length > 0 ? props.product.images[0]["image"] : ProductImage}
                    alt="promoted item image"
                    sx={{ objectFit: "contain" }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.product.title}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Box sx={{ display: "flex" }}>
                            <Button size="small" variant="contained" onClick={handleBuyNow}>
                                Buy now<ShoppingCartIcon />
                            </Button>
                            <Button size="small" variant="outlined"
                                value={props.product.id}
                                onClick={handlePostCartData} marginLeft='20px' sx={{
                                    color: main_color, '&:hover': {
                                        color: main_color_dark
                                    },
                                    marginLeft:"10px",
                                }}>
                                Add to cart<ShoppingCartIcon />
                            </Button>
                        </Box>

                        <Typography variant="h6" sx={{
                            borderRadius: "5px",
                            width: "fit-content",
                            padding: "5px",
                            color: "grey",
                        }}>Price:{props.product.price}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} /></Typography>
                        <Typography style={{ padding: "0px" }}>
                            {props.product.description?.length > 100 ? (
                                props.product.description.slice(0, 100)
                            )
                                : props.product.description}
                        </Typography>
                        <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
                    </CardContent>
                </Collapse>
            </Card>
        </Box >
    )
}

export default ItemCard