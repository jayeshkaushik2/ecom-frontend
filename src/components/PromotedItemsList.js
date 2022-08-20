import React from 'react'
import { Grid, Link } from '@mui/material';
import Colors from './Colors.js'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import SimpleCard from './SimpleCard'
import { getProductData_WithFilter } from '../context/Apis'
import Button from '@mui/material/Button';
import Default from '../pages/Default'


const PromotedItemsList = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")
    const [Product, setProductData] = React.useState(null)
    let navigate = useNavigate();

    const buttonStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        width: "95%",
        marginTop: "10px",
        marginBottom: "10px",
        marginTop: "-17px",
        backgroundColor: main_color,
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
            setProductData(data["results"].slice(0, 6))
        }
        catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {Product ?
                <Box minHeight="300px" sx={{ paddingBottom: "10px", bottom: "0px" }}>
                    <Box sx={{ marginTop: '20px', marginBottom: '20px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
                        <Grid container id="grid-id" spacing={{ xs: 2, md: 3, marginLeft: "auto" }} columns={{ xs: 2, sm: 8, md: 12 }}>
                            {Product?.map((data, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <SimpleCard product={data} getNumProduct={props.getNumProduct} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {Product ?
                        <Link href="/all-products" sx={{ color: "white", textDecoration: "none" }}>
                            <Button variant="contained" sx={buttonStyle} style={{ marginTop: "10px" }}>
                                View ALL Products
                            </Button>
                        </Link>
                        : ""}
                </Box>
                : <Default />}
        </>
    );
}



export default PromotedItemsList