import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProductImage from "../assets/images/ProductImage.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { PostCartRefData } from "../context/Apis";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import NotificationContext from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/images/defaultImage.png";


const SimpleCard = (props) => {
  let cart = React.useContext(CartContext);
  let user = React.useContext(AuthContext);
  let notify = React.useContext(NotificationContext);
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
      notify?.sendNotification({
        type: "success",
        msg: "item add successfully",
      });
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

  const handleViewMore = (product_id) => {
    redirect("/product-view", { state: { product_id: product_id } });
  };

  return (
    <Card sx={{ maxWidth: "95%", marginLeft: "10px" }}>
      <Box style={{ maxWidth: "100%", minWidth: "100px", width: "100%" }}>
        <CardMedia
          component="img"
          style={{ width: "100%", Height: "100%" }}
          image={
            props.product.images?.length > 0
              ? props.product.images[0]["image"]
              : defaultImage
          }
          alt="green iguana"
          sx={{ objectFit: "contain" }}
        />
      </Box>

      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Button
            size="small"
            variant="contained"
            value={props.product.id}
            onClick={handleBuyNow}
          >
            Buy now
            <ShoppingCartIcon />
          </Button>
          <Button
            size="small"
            variant="outlined"
            value={props.product.id}
            onClick={handlePostCartData}
            sx={{
              marginLeft: "30px",
            }}
          >
            Add to cart
            <ShoppingCartIcon />
          </Button>
        </Box>

        <Typography
          variant="h6"
          sx={{
            borderRadius: "5px",
            width: "fit-content",
            paddingTop: "10px",
            paddingBottom: "5px",
            color: "grey",
          }}
        >
          Price:{props.product.price}
          <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
          <Rating
            name="read-only"
            value={props.product.rating ? props.product.rating : 0}
            readOnly
          />
        </Typography>

        <Typography style={{ padding: "0px" }}>
          {props.product.description?.length > 100
            ? props.product.description.slice(0, 100)
            : props.product.description}
        </Typography>

        <Button
          size="small"
          variant="text"
          sx={{ marginLeft: "auto" }}
          onClick={(e) => handleViewMore(props?.product?.id)}
        >
          View More
          <ArrowForwardIcon sx={{ fontSize: "15px" }} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
