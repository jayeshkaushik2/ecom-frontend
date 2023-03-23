import React from "react";
import defaultImage from "../assets/images/defaultImage.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export const ProductDetailImage = (props) => {
  let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const [CurrentImageIndex, setCurrentImageIndex] = React.useState(0);
  console.log("props?.productImages", props?.productImages);

  const handleRightImageClick = (e) => {
    if (CurrentImageIndex + 1 >= props.productImages?.length) {
      setCurrentImageIndex(0);
    }
    if (CurrentImageIndex + 1 < props.productImages?.length) {
      setCurrentImageIndex(CurrentImageIndex + 1);
    }
    console.log("current index is", CurrentImageIndex);
  };

  const handleLeftImageClick = (e) => {
    if (CurrentImageIndex - 1 <= -1) {
      setCurrentImageIndex(props.productImages?.length - 1);
    }
    if (CurrentImageIndex - 1 > -1) {
      setCurrentImageIndex(CurrentImageIndex - 1);
    }
  };

  const LeftbuttonStyle = {
    position: "absolute",
    top: "50%",
    left: "10px",
  };

  const RightbuttonStyle = {
    position: "absolute",
    top: "50%",
    right: "10px",
  };

  return (
    <Box
      id="promoted-subcategory"
      minHeight="500px"
      sx={{
        backgroundColor: "#ffe6c1",
        maxHeight: "450px",
        overflow: "hidden",
      }}
    >
      {props?.productImages !== null && props?.productImages?.length > -1 ? (
        <Box height="inherit">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: `${
                props?.productImages[CurrentImageIndex]?.is_dark === true
                  ? "white"
                  : "black"
              }`,
            }}
          ></Box>
          <img
            width="100%"
            height="100%"
            src={
              props?.productImages?.length >= CurrentImageIndex &&
              props.productImages?.length > 0
                ? `${props?.productImages[CurrentImageIndex]?.image}`
                : defaultImage
            }
            alt="homepage image"
          />
        </Box>
      ) : (
        <>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            No Image provided!
          </Typography>
        </>
      )}
      {props?.productImages?.length > 0 ? (
        <>
          <Button
            type="btn"
            variant="contained"
            onClick={(e) => handleLeftImageClick(e)}
            sx={LeftbuttonStyle}
          >
            <ArrowCircleLeftIcon />
          </Button>
          <Button
            type="btn"
            variant="contained"
            id="right-btn"
            onClick={(e) => handleRightImageClick(e)}
            sx={RightbuttonStyle}
          >
            <ArrowCircleRightIcon />
          </Button>
        </>
      ) : null}
    </Box>
  );
};
