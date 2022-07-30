import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { CategoryList } from './CategoryList'
import NoDataFound from './NoDataFound'
import Default from './Default';

export const Home = (props) => {
  const [CategoryData, setCategoryData] = useState(null)
  const [Sub_categoryData, setSub_categoryData] = useState(null)
  const [ProductData, setProductData] = useState(null)
  const [Query, setQuery] = useState("")
  const [Flag, setFlag] = useState(false)
  const [Page, setPage] = useState("default")

  let location = useLocation();

  const checkQuery = () => {
    if (location.state?.page !== undefined && location.state?.page !== Page) {
      setPage(location.state?.page)
    }
    else if (location.state?.page === undefined && location.state?.page === Page) {
      setPage("default")
    }

    if (location.state?.query !== undefined) {
      if (location.state?.query !== Query) {
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
    getCategory()
    getSub_category()
    checkQuery()
    getCategory()
    getSub_category()
    checkQuery()
  }, [props.page_name,])

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

      {Page === "default" ?
        <>
          {ProductData !== null && Sub_categoryData !== null ?
            <Default productData={ProductData} sub_categoryData={Sub_categoryData} />
            : <NoDataFound />
          }
        </>
        : ""}

      {Page === "category" ?
        <>
          {ProductData ?
            <CategoryList ProductData={ProductData} />
            : <NoDataFound />
          }
        </>
        : ""}

        
      <Footer />
    </>
  )
}
