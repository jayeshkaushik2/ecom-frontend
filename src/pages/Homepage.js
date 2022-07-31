import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Home } from '../components/Home';
import { CategoryList } from './CategoryList';


export const Homepage = (props) => {
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [Page, setPage] = useState("home")
    const [FooterData, setFooterData] = useState(null)

    const getFooter = async () => {
        let response = await fetch(`${API_ENDPOINT}/details/`)
        let data = await response.json()
        setFooterData(data)
    }

    useEffect(() => {
        getFooter()
        let interval = setInterval(() => {
            if (props.page !== undefined && props.page !== Page) {
                setPage(props.page)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [props.page])


    return (
        <>
            <Navbar />
            <Header />
            {Page === "home" ? <Home /> : null}
            {Page === "subcategory" ? <CategoryList ProductData={null} /> : null}
            <Footer FooterData={FooterData} />
        </>
    )
}
