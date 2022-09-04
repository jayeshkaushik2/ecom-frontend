import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ProductImage from '../assets/images/ProductImage.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCartLine } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'


const CartLine = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const deleteData = async (ids) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            DeleteCartLine({ token: token, ref: ref, line_ids: { line_ids: ids } })
            props.getUpdatedData()
            props.getNumProduct()
            props.setShowMsg({ show: true, type: "success", msg: "item removed successfully" })
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleLineDelete = (e) => {
        let ids = []
        ids.push(e.target.value)
        deleteData(ids)
    }


    return (
        <Card sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "99%", borderRadius: "15px", marginTop: "0px", boxShadow: "3px 3px 12px grey", marginBottom: "10px", maxHeight:"220px" }}>
            <Box style={{ display: "flex" }}>
                <Box style={{ maxWidth: "300px", minWidth: "100px", width: "100%" }}>
                    <CardMedia
                        component="img"
                        width="100%"
                        style={{ maxHeight: "250px", minHeight: "250px" }}
                        image={props.line?.product?.images.length > 0 ? `${API_ENDPOINT}${props.line.product.images[0].image}` : ProductImage}
                        alt="green iguana"
                    />
                </Box>

                <Box style={{ width: "100%" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: "0px" }}>
                            {props.line?.product.title}
                        </Typography>
                        <Typography variant="body2" color="red">only 3 stock left</Typography>
                        <Typography variant="body2" color="gray">Eligble for free delivery</Typography>
                        <Typography variant="body1" color="black">
                            <Button size="small" variant="outlined" style={{ marginRight: "10px" }}>
                                Qty: {props.line?.quantity ? props.line.quantity : 1}
                            </Button>

                            <Button size="small" variant="outlined" style={{ color: "green", marginRight: "10px", }}>
                                Price: {props.line?.price ? props.line.price : 0}<CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                            </Button>
                        </Typography>
                        <Button size="small" variant="text" color="error" value={props.line?.id} onClick={(e) => handleLineDelete(e)} style={{ float: "right", marginBottom: "10px" }}>Delete <DeleteIcon /></Button>
                    </CardContent>
                </Box>
            </Box>
        </Card >
    )
}

export default CartLine