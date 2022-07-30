import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PromotedItems from '../components/PromotedItems'
import PromotedSubCategory from '../components/PromotedSubCategory'

const Default = (props) => {
    return (
        <Box maxWidth="xl" style={{ backgorundColor: "#fbf5ef" }} id="default-page">
            <PromotedSubCategory promoted_sub_cateData={props.sub_categoryData.slice(0, 1)} />
            <PromotedItems promoted_itemData={props.productData? props.productData.slice(0, 6) : null} />
        </Box>
    )
}

export default Default