import { useState, useEffect } from "react";
import { getCartRef, getCartRefData } from "./Apis";
import CartContext from "./CartContext";

const CartState = ({ children }) => {
  const [CartRefData, setCartRefData] = useState(null);
  const [Cart, setCart] = useState(
    localStorage.getItem("Cart")
      ? JSON.parse(localStorage.getItem("Cart"))
      : null
  );
  let token = null;

  const getCart = async () => {
    if (
      localStorage.getItem("AuthToken") !== null &&
      localStorage.getItem("AuthToken")?.access !== null
    ) {
      token = `Bearer ${JSON.parse(localStorage.getItem("AuthToken"))?.access}`;
      let data = await getCartRef({ token: token });
      setCart(data);
      getCartData(data?.ref);
      localStorage.setItem("Cart", JSON.stringify(data));
    } else {
      let data = await getCartRef({ token: null });
      setCart(data);
      getCartData(data?.ref);
      localStorage.setItem("Cart", JSON.stringify(data));
    }
  };

  const getCartData = async ({ token: token, ref: ref }) => {
    try {
      if (ref !== undefined && ref !== null) {
        let response = await getCartRefData({ token: token, ref: ref });
        if (
          response?.errors?.length > 0 &&
          response?.errors[0] === "cart does not exists"
        ) {
          getCart();
        } else {
          setCartRefData(response);
          return response;
        }
      } else {
        setCartRefData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    localStorage.removeItem("Cart");
  };

  let CartData = {
    cartRef: Cart?.ref,
    cart_id: Cart?.id,
    CartRefData: CartRefData,
    clearCart: clearCart,
    getCartData: getCartData,
    getCart: getCart,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (Cart === null || localStorage.getItem("Cart") === null) {
        getCart();
      }
    }, 5 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [Cart]);

  return (
    <CartContext.Provider value={CartData}>{children}</CartContext.Provider>
  );
};

export default CartState;
