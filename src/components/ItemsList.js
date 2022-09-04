import React, { useState, useEffect } from 'react'
import SimpleCard from './SimpleCard'
import { Grid, } from '@mui/material';
import Box from '@mui/material/Box';
import { getProductData } from '../context/Apis'
import { useLocation } from 'react-router-dom';


export const ItemsList = (props) => {
    const location = useLocation()
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

    useEffect(() => {
        console.log(location.state?.query, location.state !== undefined && location.state?.query !== undefined)
        let interval = setInterval(() => {
            if (location.state !== undefined && location.state?.query !== undefined) {
                getProductData()
            }
        }, 60 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [location.state])

    return (
        <Box sx={{ paddingBottom: "10px", bottom: "0px", marginBottom: "-40px", }}>
            <Box sx={{ marginTop: '20px', marginBottom: '20px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {ProductData?.map((data, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <SimpleCard setPage={props.setPage} product={data} getNumProduct={props.getNumProduct} setShowMsg={props.setShowMsg} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
