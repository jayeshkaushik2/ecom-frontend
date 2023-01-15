import React from "react";
import SimpleCard from "./SimpleCard";
import { Grid, Paper, Rating, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CreateApiContext } from "../context/Apis";
import { useLocation } from "react-router-dom";
import ProductImage from "../assets/images/ProductImage.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export const ItemsList = (props) => {
  const location = useLocation();
  const [ProductData, setProductsData] = React.useState(null);

  const getProductData = async (sub_category_id) => {
    try {
      let response = await CreateApiContext(
        `/product/`,
        "get",
        null,
        { page_size: 9, sub_category__id: sub_category_id },
        null
      );
      let data = await response.json();
      console.log("getProductData:", data);
      if (response.ok) {
        setProductsData(data?.results);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
    }
  };

  React.useEffect(() => {
    getProductData(location.state?.sub_category_id);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#e0e0e0", height: "100%", padding: "10px" }}>
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          columnSpacing={20}
          rowSpacing={8}
        >
          {ProductData?.map((data, key) => (
            <Grid key={key} item>
              <Paper
                sx={{
                  height: 600,
                  width: 320,
                  borderRadius: 0,
                }}
              >
                <img
                  src={
                    data?.images?.length > 0
                      ? data?.images[0]["image"]
                      : ProductImage
                  }
                  alt="homepage image"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  name={data?.id}
                />
                <Box sx={{ padding: 1 }}>
                  <Typography variant="body1">
                    {data?.description.length > 120
                      ? data?.description.slice(0, 120) + "..."
                      : data?.description}
                  </Typography>

                  <Rating
                    name="read-only"
                    value={data?.rating ? data?.rating : 0}
                    sx={{ fontSize: 20 }}
                    readOnly
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "5px",
                      width: "fit-content",
                      color: "grey",
                    }}
                  >
                    {data?.price}
                    <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />

                    <Typography display={"inline"}>
                      ({data?.discount_pct}% discount)
                    </Typography>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>

    // <Box sx={{ paddingBottom: "10px", bottom: "0px", marginBottom: "-40px" }}>
    //   <Box
    //     sx={{
    //       marginTop: "20px",
    //       marginBottom: "20px",
    //       maxWidth: "100%",
    //       flexGrow: 1,
    //     }}
    //     id="promoted-items"
    //   >
    //     <Grid
    //       container
    //       spacing={{ xs: 2, md: 3 }}
    //       columns={{ xs: 2, sm: 8, md: 12 }}
    //     >
    //       {ProductData?.map((data, index) => (
    //         <Grid item xs={2} sm={4} md={4} key={index}>
    //           <SimpleCard
    //             setPage={props.setPage}
    //             product={data}
    //             getNumProduct={props.getNumProduct}
    //             setShowMsg={props.setShowMsg}
    //           />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Box>
    // </Box>
  );
};
