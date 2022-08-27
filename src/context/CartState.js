import { useState, useEffect } from "react"
import { getCartRef } from "./Apis"
import CartContext from './CartContext'

const CartState = ({ children }) => {

    const [Cart, setCart] = useState(localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : null)

    const getCart = async () => {
        let token = null
        if (localStorage.getItem("AuthToken") !== null && localStorage.getItem("AuthToken")?.access !== null) {
            token = `Bearer ${JSON.parse(localStorage.getItem("AuthToken"))?.access}`
            let data = await getCartRef({ token: token })
            setCart(data)
            localStorage.setItem("Cart", JSON.stringify(data))
        }
        else {
            let data = await getCartRef({ token: null })
            setCart(data)
            localStorage.setItem("Cart", JSON.stringify(data))
        }
    }

    const clearCart = () => {
        localStorage.removeItem("Cart")
    }


    let CartData = {
        cartRef: Cart?.ref,
        cart_id: Cart?.id,
        clearCart:clearCart,
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