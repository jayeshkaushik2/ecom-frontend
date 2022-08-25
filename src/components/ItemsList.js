import React, { useState, useEffect } from 'react'
import SimpleCard from './SimpleCard'
import { Grid, } from '@mui/material';
import Box from '@mui/material/Box';
import { getProductData } from '../context/Apis'


export const ItemsList = (props) => {
    const [ProductData, setProductsData] = useState(null)

    const getData = async () => {
        try {
            const data = await getProductData()
            setProductsData(data["results"])
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     console.log(location.state?.query, Query, location.state !== undefined && location.state?.query !== undefined && location.state?.query !== Query)
    //     let interval = setInterval(() => {
    //         if (location.state !== undefined && location.state?.query !== undefined && location.state?.query !== Query) {
    //             console.log("calling api")
    //             getProductData()
    //             setQuery(location.state?.query)
    //         }
    //     }, 60 * 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [location.state])

    console.log("props", props)
    return (
        <Box sx={{ paddingBottom: "10px", bottom: "0px", background: "#f1f1f1", marginBottom: "-40px", }}>
            <Box sx={{ marginTop: '20px', marginBottom: '20px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {ProductData?.map((data, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <SimpleCard product={data} getNumProduct={props.getNumProduct} setPage={props.setPage} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
