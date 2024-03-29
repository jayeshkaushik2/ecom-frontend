import React from "react";
import { getCartRefData, PostOrderData } from "../context/Apis";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import {
  getOrderData,
  PostPlaceOrder,
  getOrderDetailAddress,
} from "../context/Apis";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import { Button, IconButton, Typography } from "@mui/material";
import OrderLine from "../components/OrderLine";
import OfflinePinOutlinedIcon from "@mui/icons-material/OfflinePinOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentMethods from "../components/PaymentMethods";
import NoDataFound from "./NoDataFound";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import OrderAddress from "../components/OrderAddress";
import NotificationContext from "../context/NotificationContext";

export const Checkout = (props) => {
  // api contexts
  let cart = React.useContext(CartContext);
  let user = React.useContext(AuthContext);
  let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null;
  let ref = cart?.cartRef;
  let notify = React.useContext(NotificationContext);
  let redirect = useNavigate();
  // use states
  const [OrderData, setOrderData] = React.useState(null);
  // const [cartData, setCartData] = React.useState(null);
  const [cartLines, setCartLines] = React.useState(null);
  const [OrderAddressData, setOrderAddressData] = React.useState(null);
  const [PaymentMethod, setPaymentMethod] = React.useState("");
  // const [close, onClose] = React.useState(false);

  // apis hits
  const getData = async () => {
    try {
      // order Data
      getOrderData_fun();
      // cart Data
      getCartData();
      // order address Data
      getOrderAddressData();
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderData_fun = async () => {
    try {
      const order_data = await getOrderData({ token: token, ref: ref });
      setOrderData(order_data);
      setPaymentMethod(order_data?.payment_method);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartData = async () => {
    try {
      const cart_data = await getCartRefData({ token: token, ref: ref });
      // setCartData(cart_data);
      setCartLines(cart_data.lines);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderAddressData = async () => {
    try {
      const order_address_data = await getOrderDetailAddress({
        token: token,
        ref: ref,
      });
      console.log("order data", order_address_data);
      setOrderAddressData(order_address_data);
    } catch (error) {
      console.log(error);
    }
  };

  const PostData = async (orderData) => {
    try {
      let order_data = await PostOrderData({
        token: token,
        ref: ref,
        orderData: orderData,
      });
      if (order_data.ok === true && order_data?.errors?.length === 1) {
        notify?.sendNotification({ type: "error", msg: order_data?.errors[0] });
      } else {
        setOrderData(order_data);
        setPaymentMethod(order_data?.payment_method);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  // event handlers
  const handleConfirmOrder = async () => {
    try {
      let response = await PostPlaceOrder({ token: token, ref: ref });
      if (response?.error?.length === 1) {
        notify?.sendNotification({ type: "error", msg: response?.error[0] });
      } else {
        cart.clearCart();
        notify?.sendNotification({
          type: "success",
          msg: "Your order is placed successfully.",
        });
        redirect("/");
      }
    } catch (error) {
      console.log("error section");
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: "10px", background: "#f1f1f1", marginBottom: "-40px" }}>
      {cartLines?.length === 0 || OrderData === null ? (
        <NoDataFound />
      ) : (
        <Card
          sx={{ padding: "15px", background: "white", borderRadius: "20px" }}
        >
          <Typography variant="h5">Place Order</Typography>
          <hr />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ fontWeight: "bold" }}>Order details</Typography>
              <Box
                sx={{
                  padding: "5px",
                  paddingLeft: "0px",
                  paddingBottom: "0px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "inline-flex", marginRight: "17px" }}
                >
                  {OrderData?.address === null ||
                  OrderAddressData?.pincode === "" ||
                  OrderAddressData?.house_info === "" ||
                  OrderAddressData?.city === "" ||
                  OrderAddressData?.phone === "" ||
                  OrderAddressData?.pincode === null ||
                  OrderAddressData?.house_info === null ||
                  OrderAddressData?.city === null ||
                  OrderAddressData?.phone === null ? (
                    "Please fill up the Address details."
                  ) : (
                    <>
                      Order is eligble for free delivery{" "}
                      <OfflinePinOutlinedIcon
                        sx={{
                          color: "green",
                          marginLeft: "5px",
                          fontSize: "22px",
                        }}
                      />
                    </>
                  )}
                </Typography>
              </Box>

              <Box
                sx={{ padding: "5px", paddingLeft: "0px", paddingTop: "0px" }}
              >
                <Typography variant="body2" sx={{ display: "inline-flex" }}>
                  Order type:{" "}
                  <Typography
                    variant="span"
                    marginLeft="5px"
                    color="green"
                    fontWeight="bold"
                  >
                    {OrderData?.order_type}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box
                sx={{
                  padding: "5px",
                  paddingLeft: "0px",
                  paddingTop: "0px",
                  float: "right",
                }}
              >
                <OrderAddress
                  handleClose={handleClose}
                  open={open}
                  OrderAddressData={OrderAddressData}
                  setOrderAddressData={setOrderAddressData}
                  getOrderAddressData={getOrderAddressData}
                  PostData={PostData}
                />
                <Typography sx={{ fontWeight: "bold", display: "block" }}>
                  Delivery address
                  <IconButton aria-label="edit" onClick={handleClickOpen}>
                    <EditIcon />
                  </IconButton>
                </Typography>
                {OrderAddressData && OrderAddressData !== {} ? (
                  <>
                    {OrderAddressData?.full_name ? (
                      <Typography>({OrderAddressData?.full_name})</Typography>
                    ) : null}
                    {OrderAddressData?.phone !== null ||
                    OrderAddressData?.alternate_phone !== null ? (
                      <Typography variant="body2">
                        phone: {OrderAddressData?.phone},{" "}
                        {OrderAddressData?.alternate_phone}
                      </Typography>
                    ) : null}
                    {OrderAddressData?.city !== null &&
                    OrderAddressData?.pincode !== null ? (
                      <Typography variant="body2">
                        {OrderAddressData?.city}, pincode-
                        {OrderAddressData?.pincode},
                      </Typography>
                    ) : null}
                    {OrderAddressData?.area_info !== null &&
                    OrderAddressData?.house_info !== null ? (
                      <Typography variant="body2">
                        {OrderAddressData?.area_info},{" "}
                        {OrderAddressData?.house_info}
                      </Typography>
                    ) : null}
                  </>
                ) : (
                  "Address not provided"
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
            {cartLines?.map((data, index) => (
              <Box key={index}>
                <OrderLine line={data} />
                <hr></hr>
              </Box>
            ))}
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Typography sx={{ color: "green", fontWeight: "bold" }}>
              Your order will be delivered in 3 to 5 working days.
            </Typography>

            <Typography
              variant="body2"
              display="block"
              sx={{ color: "gray" }}
              gutterBottom
            >
              <Typography variant="span" sx={{ color: "gray" }}>
                On this order your saving
              </Typography>{" "}
              {OrderData?.total_discount}
              <CurrencyRupeeIcon sx={{ fontSize: "14px" }} />.
            </Typography>

            <Typography
              variant="body2"
              display="block"
              sx={{ color: "gray" }}
              gutterBottom
            >
              <Typography variant="span" sx={{ color: "gray" }}>
                Total
              </Typography>{" "}
              {cartLines?.length} items.
            </Typography>

            <Typography
              variant="body1"
              display="block"
              sx={{ fontWeight: "bold", color: "red" }}
              gutterBottom
            >
              <Typography variant="span" sx={{ color: "gray" }}>
                Total Price:
              </Typography>{" "}
              {OrderData?.total_price}
              <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />
            </Typography>

            <PaymentMethods
              PaymentMethod={PaymentMethod}
              setPaymentMethod={setPaymentMethod}
              PostData={PostData}
            />
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                disabled={OrderData?.payment_method === "cash" ? false : true}
                sx={{ width: "100%" }}
                onClick={handleConfirmOrder}
              >
                {OrderData?.payment_method !== "cash"
                  ? "please select payment type cash on delivery"
                  : "Confirm order"}
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};
