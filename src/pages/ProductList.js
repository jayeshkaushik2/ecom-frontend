import React from 'react'
import ProductView from '../components/ProductView'
import Container from '@mui/material/Container';

export const ProductList = () => {
  const arr = [1, 2, 3, 4]
  return (
      <Container maxWidth="xl" sx={{ display: "flex", padding: "0px", backgroundColor: "red" }}>
        <Container sx={{ backgroundColor: "grey", maxWidth: "200px" }}>
          First container
        </Container>

        <Container sx={{ backgroundColor: "aqua", paddingLeft:"0px" }}>
          {arr.map((index) => (
            <ProductView key={index} />
          ))}
        </Container>
      </Container>
  )
}
