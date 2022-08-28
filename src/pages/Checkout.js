import React from 'react'
import { getCartRefData, PostOrderData } from '../context/Apis'
import Default from './Default'
import OrderList from './CartList'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import Profile from './Profile'
import { ProductList } from './ProductList'
import { getOrderData, PostPlaceOrder, getOrderDetailAddress } from '../context/Apis';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import { Button, IconButton, Typography } from '@mui/material';
import OrderLine from '../components/OrderLine';
import OfflinePinOutlinedIcon from '@mui/icons-material/OfflinePinOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentMethods from '../components/PaymentMethods';
import NoDataFound from './NoDataFound';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export const Checkout = (props) => {
    // api contexts
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)
    let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
    let ref = cart?.cartRef
    let redirect = useNavigate()
    // use states
    const [OrderData, setOrderData] = React.useState(null)
    const [cartData, setCartData] = React.useState(null)
    const [cartLines, setCartLines] = React.useState(null)
    const [OrderAddress, setOrderAddress] = React.useState(null)
    const [PaymentMethod, setPaymentMethod] = React.useState("")

    // apis hits
    const getData = async () => {
        try {
            // order Data
            const order_data = await getOrderData({ token: token, ref: ref })
            setOrderData(order_data)
            setPaymentMethod(order_data?.payment_method)
            // cart Data
            const cart_data = await getCartRefData({ token: token, ref: ref })
            setCartData(cart_data)
            setCartLines(cart_data.lines)
            // order address Data
            const order_address_data = await getOrderDetailAddress({ token: token, id: order_data?.address })
            setOrderAddress(order_address_data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const PostData = async (orderData) => {
        try {
            let order_data = await PostOrderData({ token: token, ref: ref, orderData: orderData })
            setOrderData(order_data)
            setPaymentMethod(order_data?.payment_method)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    // event handlers
    const handleConfirmOrder = async () => {
        try {
            let response = await PostPlaceOrder({ token: token, ref: ref })
            props.setShowMsg({show:true, type:"success", msg:"your order has been placed"})
            cart.clearCart()
            redirect("/")
        }
        catch (error) {
            console.log('error section')
            props.setShowMsg({show:true, type:"error", msg:"got error in response"})
            console.log(error)
        }
    }

    return (
        <Box sx={{ padding: "20px", background: "#f1f1f1", marginBottom: "-40px" }}>
            {cartLines?.length === 0 || OrderData === null ? <NoDataFound /> :
                <Card sx={{ padding: "15px", background: "white", borderRadius: "20px" }}>
                    <Typography variant='h5'>Place Order</Typography>
                    <hr />
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "50%" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Order details
                            </Typography>
                            <Box sx={{ padding: "5px", paddingLeft: "0px", paddingBottom: "0px" }}>
                                <Typography variant="body2" sx={{ display: "inline-flex", marginRight: "17px" }}>
                                    Order is eligble for free delivery <OfflinePinOutlinedIcon sx={{ color: "green", marginLeft: "5px", fontSize: "22px" }} />
                                </Typography>
                            </Box>

                            <Box sx={{ padding: "5px", paddingLeft: "0px", paddingTop: "0px" }}>
                                <Typography variant="body2" sx={{ display: "inline-flex" }}>
                                    Order type: <Typography variant='span' marginLeft="5px" color="green" fontWeight="bold" >
                                        {OrderData?.order_type}
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: "50%" }}>
                            <Box sx={{ padding: "5px", paddingLeft: "0px", paddingTop: "0px", float: "right" }}>
                                {OrderAddress ?
                                    <>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Delivery address ({OrderAddress?.full_name})
                                            <IconButton aria-label="edit" sx={{ float: "right", marginTop: "-8px" }}><EditIcon /></IconButton>
                                        </Typography>
                                        <Typography variant="body2">
                                            phone: {OrderAddress?.phone}, {OrderAddress?.alternate_phone}
                                        </Typography>
                                        <Typography variant="body2">
                                            {OrderAddress?.city}, pincode-{OrderAddress?.pincode},
                                        </Typography>
                                        <Typography variant="body2">
                                            {OrderAddress?.area_info}, {OrderAddress?.house_info}
                                        </Typography>
                                    </>
                                    : "Address not provided"}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ borderRadius: "20px", background: "#f1f1f1", padding: "10px" }}>
                        <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
                            {cartLines?.map((data, index) => (
                                <Box key={index}>
                                    <OrderLine line={data} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ padding: "10px" }}>
                        <Typography sx={{ color: "green", fontWeight: "bold" }}>
                            Your order will be delivered in 3 to 5 working days.
                        </Typography>

                        <Typography variant="body2" display="block" sx={{ color: "gray" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                On this order your saving
                            </Typography> {OrderData?.total_discount}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} />.
                        </Typography>

                        <Typography variant="body2" display="block" sx={{ color: "gray" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                Total
                            </Typography> {cartLines?.length} items.
                        </Typography>

                        <Typography variant="body1" display="block" sx={{ fontWeight: "bold", color: "red" }} gutterBottom>
                            <Typography variant="span" sx={{ color: "gray" }}>
                                Total Price:
                            </Typography> {OrderData?.total_price}<CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
                        </Typography>

                        <PaymentMethods PaymentMethod={PaymentMethod} setPaymentMethod={setPaymentMethod} PostData={PostData} />
                        <Box sx={{ textAlign: "center" }}>
                            <Button variant="contained" disabled={OrderData?.payment_method === "cash" ? false : true} size="small" sx={{ width: "100%" }} onClick={handleConfirmOrder}>{OrderData?.payment_method !== "cash" ? "please select payment type cash on delivery" : "Confirm order"}
                            </Button>
                        </Box>
                    </Box>
                </Card >
            }
        </Box >
    )
}