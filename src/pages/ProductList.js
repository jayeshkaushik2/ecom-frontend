import React from 'react'
import ProductView from '../components/ProductView'
import { Box, Typography } from '@mui/material';
import { getProductData } from '../context/Apis'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ProductList = (props) => {
  const [ProductsData, setProductsData] = React.useState(null)
  const [PriceRange, setPriceRange] = React.useState('');
  const [Rating, setRating] = React.useState('');
  const [Discount, setDiscount] = React.useState('');

  const handlePriceFilterChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRating(event.target.value);
  };

  const handleDiscountFilterChange = (event) => {
    setDiscount(event.target.value);
  };

  const getData = async () => {
    try {
      const data = await getProductData()
      setProductsData(data["results"])
    }
    catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getData()
  }, [])

  const filterStyle = {
    minWidth: "20%",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "2px 2px 12px grey",
    position: "sticky",
    top: "5rem",
    zIndex: "1",
    height: "fit-content",
    overflow: "auto",
  }

  return (
    <Box maxWidth="100%" sx={{ display: "flex", padding: "15px", background:"#f1f1f1", marginBottom:"-40px", minHeight:"300px" }}>
      <Box maxHeight="580px" sx={filterStyle}>
        <Typography variant="h6">
          Filters
        </Typography>
        <hr />
        <Box sx={{ minWidth: 120 }}>
          <Box marginBottom="10px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PriceRange}
                label="Price"
                onChange={handlePriceFilterChange}
              >
                <MenuItem value="10000-15000">10000-15000</MenuItem>
                <MenuItem value="15000-20000">15000-20000</MenuItem>
                <MenuItem value="20000+">20000+</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginBottom="10px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Rating}
                label="Rating"
                onChange={handleRatingFilterChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginBottom="10px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Discount</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Discount}
                label="Discount"
                onChange={handleDiscountFilterChange}
              >
                <MenuItem value={0.1}>10% +</MenuItem>
                <MenuItem value={0.2}>20% +</MenuItem>
                <MenuItem value={0.3}>30% +</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <FormControlLabel control={<Checkbox />} label="With discount" /> */}
        </Box>

      </Box >

      <Box sx={{ padding: "15px", marginLeft: "15px" }}>
        {ProductsData?.map((data, index) => (
          <ProductView key={index} productData={data} PriceRange={PriceRange} getNumProduct={props.getNumProduct} />
        ))}
      </Box>
    </Box >
  )
}
