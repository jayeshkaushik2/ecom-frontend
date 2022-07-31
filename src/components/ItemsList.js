import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { Grid, } from '@mui/material';
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';


export const ItemsList = (props) => {
    let location = useLocation()
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [Query, setQuery] = useState(null)
    const [ProductData, setProductData] = useState(null)

    const getProductData = async () => {
        console.log("running api...")
        let response = await fetch(`${API_ENDPOINT}/product/?title=${location.state?.query}`)
        let data = await response.json()
        console.log(data["resutls"])
        setProductData(data["results"])
    }

    useEffect(() => {
        console.log(location.state?.query, Query, location.state !== undefined && location.state?.query !== undefined && location.state?.query !== Query)
        let interval = setInterval(() => {
            if (location.state !== undefined && location.state?.query !== undefined && location.state?.query !== Query) {
                console.log("calling api")
                getProductData()
                setQuery(location.state?.query)
            }
        }, 60 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [location.state])

    return (
        <Box maxWidth="xl" sx={{ marginTop: '40px', marginBottom: '40px', minHeight: "300px" }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {ProductData?.map((data, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ItemCard product={data} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
