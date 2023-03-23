import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Input, Link, Typography } from "@mui/material";
import { CreateApiContext } from "../context/Apis";
import defaultImage from "../assets/images/defaultImage.png";

const PromotedItemsList = (props) => {
  const [SubCategoriesData, setSubCategoriesData] = React.useState(null);
  let navigate = useNavigate();

  const getSubCategories = async () => {
    try {
      let response = await CreateApiContext(
        `/sub_category/`,
        "get",
        null,
        { page_size: 8 },
        null
      );
      let data = await response.json();
      console.log("SubCategoriesData:", data);
      if (response.ok) {
        setSubCategoriesData(data?.results);
      }
    } catch (e) {
      console.log("error occured while fetching", e);
    }
  };

  React.useEffect(() => {
    getSubCategories();
  }, []);

  const handleClick = (e) => {
    navigate("/all-products", { state: { sub_category_id: e.target?.name } });
  };

  // TODO set image width x height to 300 x 320

  return (
    <Box sx={{ backgroundColor: "#e0e0e0", height: "100%", padding: "10px" }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
          {SubCategoriesData?.map((data) => (
            <Grid key={data} item>
              <Paper
                sx={{
                  height: 400,
                  width: 300,
                  borderRadius: 0,
                  padding: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {data?.name}
                </Typography>

                <img
                  src={
                    data?.image !== null && data?.image !== null
                      ? data.image
                      : defaultImage
                  }
                  alt="homepage image"
                  style={{
                    width: "100%",
                    maxHeight: "320px",
                    overflow: "hidden",
                    paddingTop: 7,
                    cursor: "pointer",
                  }}
                  name={data?.id}
                  onClick={(e) => handleClick(e)}
                />
                <Link
                  name={data?.id}
                  onClick={(e) => handleClick(e)}
                  underline="none"
                  sx={{
                    cursor: "pointer",
                    fontWeight: "500",
                    display: "block",
                    marginTop: "10px",
                  }}
                >
                  Shop now
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromotedItemsList;
