import React from 'react'
import { Grid, } from '@mui/material';
import Container from '@mui/material/Container';
import PromotedItemsCart from './PromotedItemsCart';
import Colors from './Colors.js'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const PromotedItems = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")
    const buttonStyle = {
        backgroundColor: main_color,
        mt:"15px", 
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: '40px', marginBottom: '40px' }} id="promoted-items">
            <Grid container id="grid-id" spacing={{ xs: 2, md: 3, marginLeft:"auto" }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.promoted_itemData?.map((dataa, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <PromotedItemsCart product={dataa} />
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" sx={buttonStyle}>View All Items <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
        </Container>
    );
}



export default PromotedItems