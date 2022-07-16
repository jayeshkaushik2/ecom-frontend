import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Items } from '../components/Items'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'

export const Home = () => {
    const [CategoryData, setCategoryData] = useState(null)
    const [Sub_categoryData, setSub_categoryData] = useState(null)
    const [ProductData, setProductData] = useState(null)
    

    useEffect(() => {
      getCategory();
      getSub_category();
      getProduct();
    }, [])
    
    const getCategory = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/category/")
        let data = await response.json()
        setCategoryData(data)
    }

    const getSub_category = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/sub_category/")
        let data = await response.json()
        setSub_categoryData(data)
    }

    const getProduct = async () => {
        let response = await fetch("https://ecom-backend-j.herokuapp.com/product/")
        let data = await response.json()
        setProductData(data)
    }


    return (
        <>
            <Navbar />
            {Sub_categoryData? <Header Sub_categoryData={Sub_categoryData["results"]} /> : ""}
            {ProductData? <Items ProductData={ProductData["results"]} /> : ""}
            <Footer />
        </>
    )
}
