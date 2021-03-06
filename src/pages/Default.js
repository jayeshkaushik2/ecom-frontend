import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PromotedItemsList from '../components/PromotedItemsList'
// import PromotedSubCategory from '../components/PromotedSubCategory'

const Default = (props) => {
    return (
        <Box maxWidth="xl" style={{ backgorundColor: "#fbf5ef" }} id="default-page">
            {/* <PromotedSubCategory subCategoryData={props.sub_categoryData.slice(0, 1)} /> */}
            <PromotedItemsList productData={props.productData? props.productData.slice(0, 6) : null} />
        </Box>
    )
}

export default Default