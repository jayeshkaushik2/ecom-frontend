import React from 'react'
import { Header } from '../components/Header'
import { Items } from '../components/Items'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'

export const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <Items />
            <Footer />
        </>
    )
}
