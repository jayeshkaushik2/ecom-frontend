import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { ItemsList } from './ItemsList'
import DefaultSkelton from './DefaultSkelton'
import Default from './Default';
import { Home } from '../components/Home';


export const Homepage = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [Page, setPage] = useState("home")

    return (
        <>
            <Navbar />
            <Header />
            {Page === "home" ? <Home /> : null}
            <Footer />
        </>
    )
}
