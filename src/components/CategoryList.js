import React, { useState, useEffect } from 'react'
import SimpleCard from './SimpleCard'
import { Grid, } from '@mui/material';
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import { getProductData_WithFilter } from '../context/Apis'

export const CategoryList = (props) => {
    let location = useLocation()
    const [ProductData, setProductData] = useState(null)

    const getData = async () => {
        try {
            let query = new URLSearchParams(location.search).get("query")
            const data = await getProductData_WithFilter({search_with:"sub_category__name", query:query})
            setProductData(data["results"])
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getData()
    }, [])

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
