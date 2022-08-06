import React, { useEffect, useState, useContext } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Home } from '../components/Home';
import { CategoryList } from '../components/CategoryList';
import { ItemsList } from '../components/ItemsList';
import { getFooter } from '../context/Apis'
import Default from './Default'
import NoDataFound from './NoDataFound'

export const Homepage = (props) => {
    const [Page, setPage] = useState("")
    const [FooterData, setFooterData] = useState(null)

    const getData = async () => {
        try {
            const data = await getFooter()
            setFooterData(data)
            let interval = setInterval(() => {
                if (props.page !== undefined && props.page !== Page) {
                    setPage(props.page)
                }
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        console.log(props.page)
        getData()
    }, [props.page])

    return (
        <>
            <Navbar />
            <Header />
            {Page === "" ? <Default /> : null}
            {Page === "home" ? <Home /> : null}
            {Page === "products" ? <ItemsList ProductData={null} /> : null}
            {Page === "subcategory" ? <CategoryList ProductData={null} /> : null}
            <Footer FooterData={FooterData} />
        </>
    )
}
