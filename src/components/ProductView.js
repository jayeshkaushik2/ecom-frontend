import React from 'react'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import defaultImage from '../assets/images/defaultImage.png'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { PostCartRefData } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'


export default function ProductView(props) {
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const postCartLineData = async (lineData) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await PostCartRefData({ token: token, ref: ref, lineData: { lines: [lineData] } })
            props.setShowMsg({ show: true, type: "success", msg: "product added to cart" })
            props.getNumProduct()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePostCartData = (e) => {
        let dataIs = {
            cart: cart?.cart_id,
            product: e.target.value,
            ref: cart?.cartRef,
        }
        postCartLineData(dataIs)

    }

    const handleBuyNow = () => {
    }

    return (
        <Card sx={{
            marginLeft: "auto", marginRight: "auto", maxWidth: "99%", borderRadius: "15px", marginTop: "0px", boxShadow: "3px 3px 12px grey", marginBottom: "10px", display: "flex",
        }}>
            <Box style={{ maxWidth: "300px", minWidth: "100px", width: "100%" }}>
                <CardMedia
                    component="img"
                    sx={{maxHeight:"300px"}}
                    width="100%"
                    image={props.productData?.images?.length > 0 ? props.productData.images[0].image : defaultImage}
                    alt="green iguana"
                />
            </Box>

            <CardContent>
                <Typography className='text' gutterBottom variant="h6" component="div">
                    {props.productData?.title}
                </Typography>
                <Typography variant="body2"
                    padding="5px">
                    Limited time deal
                </Typography>

                <Box sx={{ display: "flex", marginLeft:"5px"}}>
                    {props.productData?.discount_pct && props.productData?.discount_pct !== 0 ?
                        <Typography color="white" backgroundColor="red" borderRadius="5px"
                            padding="5px" fontSize="17px" lineHeight="0.5"  marginRight="10px">
                            <s>{props.productData?.price} <CurrencyRupeeIcon sx={{ fontSize: "15px" }} /></s>
                        </Typography>
                        : null}

                    <Typography >
                        <Button size="small" variant="outlined" style={{ color: "green", marginRight: "10px", fontWeight: "bold" }}>
                            Price: {props.productData?.discount_pct && props.productData?.discount_pct !== 0 ?
                                (props.productData?.price - (props.productData?.price * props.productData?.discount_pct) / 100)
                                : props.productData?.price} <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />

                            {/* {(props.productData?.price * props.productData?.discount_pct) / 100} <CurrencyRupeeIcon sx={{ fontSize: "15px" }} /> */}
                        </Button>
                    </Typography>

                    {props.productData?.discount_pct && props.productData?.discount_pct !== 0 ?
                        <Typography fontSize="15px" margin="-4px">
                            ({props.productData?.discount_pct * 100}% off)
                        </Typography>
                        : null}
                </Box>

                <Typography variant="body2" padding="5px">
                    Flat INR 2000 Off on ICICI BankCards
                </Typography>

                <Typography variant="body2" color="" padding="5px" >
                    Get it by <span style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                    }}> tomorrow, July 20</span>
                </Typography>

                <Typography variant="body2" color="" padding="5px" >
                    FREE Delivery by Amazon
                </Typography>

                <CardActions padding="4px" margin="0px">
                    <Button size="small" variant="contained" onClick={handleBuyNow}>Buy Now</Button>
                    <Button size="small" variant="contained" value={props.productData?.id} onClick={handlePostCartData}>Add to Cart</Button>
                </CardActions>
            </CardContent>

        </Card >
    )
}

