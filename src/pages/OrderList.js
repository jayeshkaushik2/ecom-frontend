import React from 'react'
import { getCartRefData } from '../context/Apis'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import CartLine from '../components/CartLine'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import NoDataFound from './NoDataFound'


const OrderList = (props) => {
    const [cartData, setCartData] = React.useState(null)
    const [cartLines, setCartLines] = React.useState(null)
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await getCartRefData({ token: token, ref: ref })
            setCartData(data)
            setCartLines(data.lines)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <Box style={{ background: "antiquewhite", paddingTop: "20px", paddingBottom: "20px" }}>
            <Box style={{ background: "white", padding: "10px" }}>
                <Typography variant="h5" style={{padding:"5px"}}>Shopping Cart</Typography>
                <hr/>
                {cartLines?.length > 0? cartLines.map((line, index) => (
                    <CartLine key={index} line={line} getUpdatedData={getData} getNumProduct={props.getNumProduct} />
                )) : <NoDataFound/>}
            </Box>
        </Box>
    )
}

export default OrderList