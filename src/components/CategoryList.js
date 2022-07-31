import React, { useState, useEffect } from 'react'
import SimpleCard from './SimpleCard'
import { Grid, } from '@mui/material';
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';


export const CategoryList = (props) => {
  let location = useLocation()
  let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [Query, setQuery] = useState(null)
  const [ProductData, setProductData] = useState(null)

  const getProductData = async () => {
    let response = await fetch(`${API_ENDPOINT}/product/?sub_category__name=${location.state?.query}`)
    let data = await response.json()
    setProductData(data["results"])
  }

  useEffect(() => {
    let interval = setInterval(() => {
      if (location.state !== undefined && location.state?.query !== undefined && location.state?.query !== Query) {
        setQuery(location.state?.query)
        getProductData()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [location.state])

  return (
    <Box sx={{ marginTop: '40px', marginBottom: '40px', minHeight: "300px" }}>
      <Grid container spacing={{ xs: 2, md: 3, marginLeft: "auto" }} columns={{ xs: 2, sm: 8, md: 12 }}>
        {ProductData?.map((data, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <SimpleCard product={data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
