import React from 'react'
import { Grid, } from '@mui/material';
import Colors from './Colors.js'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import SimpleCard from './SimpleCard'
import { getProductData_WithFilter } from '../context/Apis'


const PromotedItemsList = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")
    const [Product, setProductData] = React.useState(null)
    let navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: main_color,
        mt: "15px",
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    const handleViewAll = (e) => {
        e.preventDefault()
        console.log("working button")
        navigate("/items", { ProductData: props.productData ? props.productData : null })
    }

    const getData = async () => {
        try {
            const data = await getProductData_WithFilter({ search_with: "is_promoted", query: true })
            setProductData(data["results"])
        }
        catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <Box minHeight="300px">
            <Box sx={{ marginTop: '40px', marginBottom: '40px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
                <Grid container id="grid-id" spacing={{ xs: 2, md: 3, marginLeft: "auto" }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {Product?.map((data, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <SimpleCard product={data} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}



export default PromotedItemsList