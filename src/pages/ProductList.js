import React from "react";
import ProductView from "../components/ProductView";
import { Box, Button, Typography } from "@mui/material";
import { getProductData } from "../context/Apis";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NoDataFound from "./NoDataFound";
import { useLocation } from "react-router-dom";

export const ProductList = (props) => {
  const [ProductsData, setProductsData] = React.useState(null);
  const [PriceRange, setPriceRange] = React.useState("");
  const [Rating, setRating] = React.useState("");
  const [Discount, setDiscount] = React.useState("");
  const [Prev_query, setPrev_query] = React.useState("");
  const [Search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({});
  let location = useLocation();

  function update_filters(data) {
    let temp = filters;
    for (var item in data) {
      temp[item] = data[item];
    }
    setFilters(temp);
  }

  const handlePriceFilterChange = (e) => {
    setPriceRange(e.target.value);
    let temp = e.target.value.split("-");
    let gt = temp[0];
    let lt = temp[1];
    let filter = {};
    if (lt !== null && lt !== undefined) {
      filter["price__lt"] = lt;
    }
    if (gt !== null && gt !== undefined) {
      filter["price__gt"] = gt;
    }
    update_filters(filter);
    getFilterData(filter);
  };

  const handleRatingFilterChange = (e) => {
    setRating(e.target.value);
    update_filters({ rating: e.target.value });
  };

  const handleDiscountFilterChange = (e) => {
    setDiscount(e.target.value);
    update_filters({ discount__gte: e.target.value });
  };

  const getFilterData = async (query_params) => {
    try {
      const data = await getProductData({ filters: query_params });
      setProductsData(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const query = location?.state.query;
    update_filters(query);
    getFilterData(query);
  }, [location?.state]);

  const filterStyle = {
    minWidth: "20%",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "15px",
    boxShadow: "2px 2px 12px grey",
    position: "sticky",
    top: "5rem",
    zIndex: "1",
    height: "fit-content",
    overflow: "auto",
    maxHeight: "580px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "15px",
        marginBottom: "-40px",
        minHeight: "300px",
        maxWidth: "100%",
      }}
    >
      <Box sx={filterStyle}>
        <Typography variant="h6">Filters</Typography>
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
                <MenuItem value={10}>10% +</MenuItem>
                <MenuItem value={20}>20% +</MenuItem>
                <MenuItem value={30}>30% +</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={(e) => {
              setFilters({});
            }}
          >
            Clear filters
          </Button>
        </Box>
      </Box>

      <Box sx={{ padding: "15px", marginLeft: "15px", width: "100%" }}>
        {ProductsData?.length > 0 ? (
          ProductsData.map((data, index) => (
            <ProductView
              setShowMsg={props.setShowMsg}
              key={index}
              productData={data}
              PriceRange={PriceRange}
              getNumProduct={props.getNumProduct}
            />
          ))
        ) : (
          <Box
            sx={{
              maxWidth: "100%",
              maxHeight: "270px",
              overflow: "hidden",
            }}
          >
            <NoDataFound />
          </Box>
        )}
      </Box>
    </Box>
  );
};
