import { Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductDetailImage } from "../components/ProductDetailImage";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getProductIdData, PostCartRefData } from "../context/Apis";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import NotificationContext from "../context/NotificationContext";

export const ProductDetailView = (props) => {
  let cart = React.useContext(CartContext);
  let user = React.useContext(AuthContext);
  let notify = React.useContext(NotificationContext);
  let redirect = useNavigate();
  let location = useLocation();
  const [productImages, setProductImages] = React.useState([]);
  const [productData, setProductData] = React.useState(null);

  const getproductIdDetail = async (product_id) => {
    try {
      const response = await getProductIdData({ productId: product_id });
      setProductData(response);
      setProductImages(response?.images);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const product_id = location?.state?.product_id;
    getproductIdDetail(product_id);
  }, [location?.state]);

  const postCartLineData = async (lineData) => {
    try {
      let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null;
      let ref = cart?.cartRef;
      await PostCartRefData({
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

  return (
    <div>
      <div id="images">
        <ProductDetailImage productImages={productImages} />
      </div>
      <div style={{ padding: "10px" }}>
        <div id="detail">
          <Typography variant="h5">{productData?.title}</Typography>
          <div id="pricing" style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Typography
              variant="body1"
              color="white"
              backgroundColor="red"
              borderRadius="5px"
              padding="5px"
              width="fit-content"
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Total price:{" "}
              <s>
                {productData?.price}{" "}
                <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
              </s>
            </Typography>
            <Typography
              variant="body1"
              color="white"
              width="fit-content"
              backgroundColor="#00ad00"
              borderRadius="5px"
              padding="5px"
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Price:{" "}
              {productData?.discount_pct && productData?.discount_pct !== 0
                ? productData?.price -
                  (productData?.price * productData?.discount_pct) / 100
                : productData?.price}
              <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
            </Typography>
            <Typography variant="body2">
              You are getting
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {productData?.discount_pct}%{" "}
              </span>
              discount on this Product.
            </Typography>

            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  width: "49%",
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={productData?.id}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                size="large"
                variant="contained"
                sx={{
                  width: "49%",
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={productData?.id}
                onClick={handlePostCartData}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <hr></hr>
        <div id="check-deliverable" style={{ marginTop: "10px" }}>
          check-deliverable
        </div>
        <hr></hr>

        <div id="description" style={{ marginTop: "10px" }}>
          <Typography variant="body1">
            Description: {productData?.description}
          </Typography>
        </div>
        <hr></hr>

        <div id="reviews" style={{ marginTop: "10px" }}>
          reviews
        </div>
      </div>
    </div>
  );
};
