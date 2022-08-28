import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Home } from '../components/Home';
import { CategoryList } from '../components/CategoryList';
import { ItemsList } from '../components/ItemsList';
import { getFooter, getCartRefData } from '../context/Apis'
import Default from './Default'
import OrderList from './CartList'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import Profile from './Profile'
import { ProductList } from './ProductList'
import { Checkout } from './Checkout';
import Notifications from '../context/Notifications';

export const Homepage = (props) => {
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)
    const [Page, setPage] = useState("")
    const [FooterData, setFooterData] = useState(null)
    const [NumProduct, setNumProduct] = React.useState(0);
    const [ShowMsg, setShowMsg] = React.useState({ show: false, type: "error", msg: null })
    const [Query, setQuery] = React.useState("");


    const getNumProduct = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            const data = await getCartRefData({ token: token, ref: ref })
            setNumProduct(data.lines?.length)
        }
        catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            const data = await getFooter()
            setFooterData(data)
            if (props.page !== undefined && props.page !== Page) {
                setPage(props.page)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        getNumProduct()
    }, [props.page])

    return (
        <>
            <Navbar setQuery={setQuery} setPage={setPage} />

            <Header num_product={NumProduct} />

            {ShowMsg ?
                <Notifications msgType="success" msg="item added to cart" ShowMsg={ShowMsg} setShowMsg={setShowMsg} />
                : null}

            {Page === "" ? <Default /> : null}

            {Page === "home" ? <Home setPage={setPage} setShowMsg={setShowMsg} getNumProduct={getNumProduct} /> : null}

            {Page === "searched_products" ? <ProductList ProductData={null} setShowMsg={setShowMsg} Query={Query} getNumProduct={getNumProduct} /> : null}

            {Page === "all_products" ? <ItemsList setPage={setPage} setShowMsg={setShowMsg} ProductData={null} getNumProduct={getNumProduct} /> : null}

            {Page === "subcategory" ? <CategoryList setPage={setPage} setShowMsg={setShowMsg} ProductData={null} getNumProduct={getNumProduct} /> : null}

            {Page === "order" ? <OrderList ProductData={null} setShowMsg={setShowMsg} getNumProduct={getNumProduct} /> : null}

            {Page === "profile" ? <Profile setShowMsg={setShowMsg} getNumProduct={getNumProduct} /> : null}

            {Page === "checkout" ? <Checkout setShowMsg={setShowMsg} /> : null}

            <Footer FooterData={FooterData} />
        </>
    )
}
