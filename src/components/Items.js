import React from 'react'
import ItemCart from './ItemCart'
import { Grid, } from '@mui/material';
import Container from '@mui/material/Container';

export const Items = () => {
    return (
        <Container maxWidth="xl" sx={{ marginTop: '40px', marginBottom: '40px' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ItemCart />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
