import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ProductImage from "../assets/images/ProductImage.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { PostCartRefData } from "../context/Apis";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductView(props) {
  let cart = React.useContext(CartContext);
  let user = React.useContext(AuthContext);
  let redirect = useNavigate();

  const postCartLineData = async (lineData) => {
    try {
      let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null;
      let ref = cart?.cartRef;
      const data = await PostCartRefData({
        token: token,
        ref: ref,
        lineData: { lines: [lineData] },
      });
      cart.getCartData({ token: token, ref: cart?.cartRef });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostCartData = (e) => {
    let dataIs = {
      cart: cart?.cart_id,
      product: e.target.value,
      ref: cart?.cartRef,
    };
    postCartLineData(dataIs);
  };

  const handleBuyNow = (e) => {
    let dataIs = {
      cart: cart?.cart_id,
      product: e.target.value,
      ref: cart?.cartRef,
    };
    postCartLineData(dataIs);
    redirect("/order");
  };

  return (
    <Card
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "99%",
        borderRadius: "15px",
        marginTop: "0px",
        boxShadow: "3px 3px 12px grey",
        marginBottom: "10px",
        display: "flex",
        maxHeight: "282px",
      }}
    >
      <Box style={{ maxWidth: "300px", minWidth: "100px", width: "100%" }}>
        <CardMedia
          component="img"
          sx={{ height: "100%", width: "100%" }}
          image={
            props.productData?.images?.length > 0
              ? props.productData.images[0].image
              : ProductImage
          }
          alt="green iguana"
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <CardContent sx={{ padding: "10px", overflow: "auto" }}>
          <Typography
            className="text"
            gutterBottom
            variant="subtitle1"
            sx={{ margin: 0 }}
          >
            {props.productData?.title.slice(0, 100)}...
          </Typography>
          <Typography variant="body2" padding="5px">
            Limited time deal
          </Typography>

          <Box sx={{ display: "flex", marginLeft: "5px" }}>
            {props.productData?.discount_pct &&
            props.productData?.discount_pct !== 0 ? (
              <Typography
                variant="text"
                color="white"
                backgroundColor="red"
                borderRadius="5px"
                padding="5px"
                lineHeight="0.5"
                marginRight="10px"
              >
                <s>
                  {props.productData?.price}{" "}
                  <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
                </s>
              </Typography>
            ) : null}

            <Typography
              variant="body2"
              sx={{
                background: "#00ad00",
                borderRadius: "5px",
                padding: "4px",
                marginRight: "9px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Price:{" "}
              {props.productData?.discount_pct &&
              props.productData?.discount_pct !== 0
                ? props.productData?.price -
                  (props.productData?.price * props.productData?.discount_pct) /
                    100
                : props.productData?.price}
              <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
            </Typography>

            {props.productData?.discount_pct &&
            props.productData?.discount_pct !== 0 ? (
              <Typography fontSize="13px" margin="-4px">
                ({props.productData?.discount_pct}% off)
              </Typography>
            ) : null}
          </Box>

          <Typography variant="body2" sx={{ fontSize: "12px" }} padding="5px">
            Flat INR 2000 Off on ICICI BankCards
          </Typography>

          <Typography variant="body2" color="" padding="5px">
            Get it by{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {" "}
              tomorrow, July 20
            </span>
          </Typography>

          <Typography variant="body2" color="" padding="5px">
            FREE Delivery by Amazon
          </Typography>

          <CardActions padding="4px" margin="0px">
            <Button
              size="small"
              variant="contained"
              value={props.productData?.id}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button
              size="small"
              variant="contained"
              value={props.productData?.id}
              onClick={handlePostCartData}
            >
              Add to Cart
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
}
