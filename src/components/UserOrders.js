import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import UserOrderCart from './UserOrderCart'


export const UserOrders = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            {props.orders?.map((key, index) => (
                <Box key={index} sx={{padding: "10px", background: "#f1f1f1", marginBottom:"10px"}}>
                    <Box id="cart-details">
                        this is the cart
                    </Box>

                    <Box id="order-details">
                        <Typography sx={{ color: "green", fontWeight: "bold" }}>
                            Your order will be delivered in 3 to 5 working days.
                        </Typography>

                        <Typography variant="body2" display="block" sx={{ color: "gray" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                On this order your saving
                            </Typography> {key?.total_discount}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} />.
                        </Typography>

                        <Typography variant="body2" display="block" sx={{ color: "gray" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                Total
                            </Typography> {0} items.
                        </Typography>

                        <Typography variant="body1" display="block" sx={{ fontWeight: "bold", color: "red" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                Total Price:
                            </Typography> {key?.total_price}<CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
                        </Typography>

                    </Box>
                    <UserOrderCart handleClose={handleClose} open={open} cart_id={3} />
                    <Button variant="contained" fullWidth onClick={handleClickOpen}>Show Items</Button>
                </Box>
            ))}</Box>
    )
}
