import React from 'react'
import { getCartRefData } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import CartLine from '../components/CartLine'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import NoDataFound from './NoDataFound'
import { Button, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const OrderList = (props) => {
    // eslint-disable-next-line
    const [cartLines, setCartLines] = React.useState(null)
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)
    let redirect = useNavigate()

    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            let response = await cart?.getCartData({token:token, ref:ref})
            setCartLines(response?.lines)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const handleContinueToBuy = () => {
        // check if user is logged in or not
        console.log("user.user", user.user)
        if (user.user === null){
            redirect("/signin")
        }
        else{
            redirect("/checkout")
        }
    }

    console.log(cartLines?.length === 0)

    return (
        <Box>
            <Box style={{ padding: "10px", minHeight: "300px" }}>
                <Typography variant="h5" style={{ padding: "5px" }}>Shopping Cart</Typography>
                <hr style={{ marginBottom: "30px" }} />
                {cartLines?.length > 0 ? cartLines.map((line, index) => (
                    <CartLine key={index} line={line} getUpdatedData={getData} />
                )) :
                    <Box sx={{
                        maxWidth: "100%",
                        maxHeight: "270px",
                        overflow: "hidden"
                    }}>
                        <NoDataFound />
                    </Box>}
                <Button variant="contained" sx={{ width: "98.5%", bottom: "0", top:"20px" }} disabled={cartLines?.length === 0? true: false} onClick={handleContinueToBuy}>Continue to buy</Button>
            </Box>
        </Box>
    )
}

export default OrderList