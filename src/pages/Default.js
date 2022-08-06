import React from 'react'
import Grid from '@mui/material/Grid';
import DefaultSkelton from './DefaultSkelton'
import Box from '@mui/material/Box';

const Default = () => {
    return (
        <Box style={{ backgorundColor: "#fff4e0", minHeight: "300px", marginTop: "40px", marginBottom: "40px", marginLeft: "10px", marginRight: "10px" }} id="default-page">

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {Array.from(Array(3)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <DefaultSkelton />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Default