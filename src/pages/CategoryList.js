import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { Grid, } from '@mui/material';
import Container from '@mui/material/Container';

export const CategoryList = (props) => {

  return (
    <Container maxWidth="xl" sx={{ marginTop: '40px', marginBottom: '40px' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {props.ProductData?.map((data, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CategoryCard product={data} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
