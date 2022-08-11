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
import { DeleteCartLine } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'


const CartLine = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const deleteData = async (line_ids) => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await DeleteCartLine({ token: token, ref: ref, line_ids: line_ids })
            alert("deleted successfully, please refresh the page")
            // props.getUpdatedData()
        }
        catch(error) {
            console.log(error)
        }
    }


    const handleLineDelete = (e) => {
        let ids = []
        ids.push(e.target.value)
        let line_ids = {line_ids:ids}
        console.log("line ids", line_ids)
        deleteData(line_ids)
    }


    return (
        <Card sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "100", marginTop: "10px" }}>
            <Box style={{ display: "flex" }}>
                <Box style={{ maxWidth: "500px", minWidth: "200px" }}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={props.line?.product.images ? `${API_ENDPOINT}${props.line.product.images[0].image}` : defaultImage}
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
                            Price: {props.line?.price ? props.line.price : 0}<CurrencyRupeeIcon style={{ fontSize: "15px", marginTop: "10px" }} />
                        </Typography>
                        <Button size="small" variant="text" color="error" value={props.line?.id} onClick={(e) => handleLineDelete(e)} style={{ float: "right", marginBottom: "10px" }}>Delete <DeleteIcon /></Button>
                    </CardContent>
                </Box>
            </Box>
        </Card >
    )
}

export default CartLine