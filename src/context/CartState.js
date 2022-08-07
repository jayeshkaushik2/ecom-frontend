import { useState, useEffect, useContext } from "react"
import { getCartRef } from "./Apis"
import CartContext from './CartContext'
import AuthContext from "./AuthContext"

const CartState = ({ children }) => {
    const userData = useContext(AuthContext)

    const [Cart, setCart] = useState(localStorage.getItem("Cart") ? localStorage.getItem("Cart").ref : null)

    const getCart = async () => {
        let token = null
        if (localStorage.getItem("AuthToken") !== null && localStorage.getItem("AuthToken")?.access !== null) {
            token = `Bearer ${JSON.parse(localStorage.getItem("AuthToken"))?.access}`
            let data = await getCartRef({ token: token })
            setCart(data)
            localStorage.setItem("Cart", JSON.stringify(data))
        }
        else {
            let data = await getCartRef({token:null})
            setCart(data)
            localStorage.setItem("Cart", JSON.stringify(data))
        }
    }


    let CartData = {
        cart: Cart
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (Cart === null || localStorage.getItem("Cart") === null) {
                getCart()
            }
        }, 5 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [Cart,])

    return (
        <CartContext.Provider value={CartData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartState