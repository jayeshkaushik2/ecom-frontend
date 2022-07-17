import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { CategoryList } from './CategoryList'
import NoDataFound from './NoDataFound'

export const Home = () => {
    const [CategoryData, setCategoryData] = useState(null)
    const [Sub_categoryData, setSub_categoryData] = useState(null)
    const [ProductData, setProductData] = useState(null)
    const [Query, setQuery] = useState("")
    const [Flag, setFlag] = useState(false)

    let location = useLocation();

    const checkQuery = () => {
        if (location.state?.query !== undefined) {
            console.log(location.state?.query, Query)
            if (location.state?.query !== Query){
                getSearchedProduct(location.state?.query)
                setQuery(location.state?.query)
            }
        }
        else if (location.state?.query === undefined && Flag === false) {
            setFlag(true)
            getProduct()
        }
    }

    useEffect(() => {
        getCategory();
        getSub_category();
        checkQuery()
    }, [])

    setTimeout(() => {
        checkQuery()
    }, 3000);

    const getCategory = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/category/")
        let data = await response.json()
        setCategoryData(data["results"])
    }

    const getSub_category = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/sub_category/")
        let data = await response.json()
        setSub_categoryData(data["results"])
    }

    const getProduct = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/product/")
        let data = await response.json()
        setProductData(data["results"])
    }

    const getSearchedProduct = async (query) => {
        let response = await fetch(`https://ecom-backend-j.herokuapp.com/product/?sub_category__name=${query}`)
        let data = await response.json()
        setProductData(data["results"])
    }

    return (
        <>
            <Navbar />
            {Sub_categoryData ? <Header Sub_categoryData={Sub_categoryData} /> : ""}
            {ProductData ? <CategoryList ProductData={ProductData} /> : <NoDataFound />}
            <Footer />
        </>
    )
}
