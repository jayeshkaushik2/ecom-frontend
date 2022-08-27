import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import defaultImage from '../assets/images/defaultImage.png'
import DeleteIcon from '@mui/icons-material/Delete';
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'


const OrderLine = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)


    return (
        <Box sx={{background:"#f1f1f1", paddingTop:"10px" }}>
            <Box style={{ display: "flex" }}>
                <Box style={{ maxWidth: "300px", minWidth: "100px", width: "100%" }}>
                    <CardMedia
                        component="img"
                        width="100%"
                        style={{ maxHeight: "100px", minHeight: "100px" }}
                        image={props.line?.product.images ? `${API_ENDPOINT}${props.line.product.images[0].image}` : defaultImage}
                        alt="green iguana"
                    />
                </Box>

                <Box style={{ width: "100%" }}>
                    <CardContent sx={{ maxWidth: "90%" }}>
                        <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: "0px" }}>
                            {props.line?.product.title}
                        </Typography>
                        <Typography variant="body2" color="red">only 3 stock left</Typography>
                        <Typography variant="body1" color="black">
                            <Button size="small" variant="outlined" style={{ marginRight: "10px" }}>
                                Qty: {props.line?.quantity ? props.line.quantity : 1}
                            </Button>

                            <Button size="small" variant="outlined" style={{ color: "green", marginRight: "10px", }}>
                                Price: {props.line?.price ? props.line.price : 0}<CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                            </Button>
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button size="small" variant="text" color="error" value={props.line?.id} style={{ float: "right" }}><DeleteIcon /></Button>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderLine