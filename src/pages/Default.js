import React from 'react'
import Grid from '@mui/material/Grid';
import DefaultSkelton from './DefaultSkelton'
import Box from '@mui/material/Box';

const Default = () => {
    return (
        <Box minHeight="300px" sx={{ backgroundColor: "#fff4e0", paddingBottom: "10px", bottom: "0px" }}>
            <Box sx={{ marginTop: '20px', marginBottom: '20px', maxWidth: "100%", flexGrow: 1 }} id="promoted-items">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {Array.from(Array(3)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <DefaultSkelton />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default Default