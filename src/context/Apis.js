import AuthContext from "./AuthContext";
import { useContext } from "react";
import Notifications from "./NotificationState";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getFooter() {
  let response = await fetch(`${API_ENDPOINT}/details/`, {
    method: "GET",
  });
  let details_data = await response.json();
  if (response.ok) {
    return details_data;
  } else {
    throw response;
  }
}

export async function getSubCategory() {
  let response = await fetch(`${API_ENDPOINT}/sub_category/`, {
    method: "GET",
  });
  let sub_category_data = await response.json();
  if (response.ok) {
    return sub_category_data;
  } else {
    throw response;
  }
}

export async function getProductData() {
  let response = await fetch(`${API_ENDPOINT}/product/`, {
    method: "GET",
  });
  let product_data = await response.json();
  if (response.ok) {
    return product_data;
  } else {
    throw response;
  }
}

export async function getProductData_WithFilter({
  search_with: search_with,
  query: query,
}) {
  let response = await fetch(
    `${API_ENDPOINT}/product/?${search_with}=${query}`,
    {
      method: "GET",
    }
  );
  let filtered_product_data = await response.json();
  if (response.ok) {
    return filtered_product_data;
  } else {
    throw response;
  }
}

export async function getHomepageData() {
  let response = await fetch(`${API_ENDPOINT}/homepage/`);
  let homepage_data = await response.json();
  if (response.ok) {
    return homepage_data;
  } else {
    throw response;
  }
}

export async function getCartRef({ token: token }) {
  let response = await fetch(`${API_ENDPOINT}/create_cart/`, {
    method: "GET",
    headers: { Authorization: token },
  });
  let create_data = await response.json();
  if (response.ok) {
    return create_data;
  } else {
    throw response;
  }
}

export async function getCartRefData({ token: token, ref: ref }) {
  let response = await fetch(`${API_ENDPOINT}/update_cart/${ref}/`, {
    method: "GET",
    headers: { Authorization: token },
  });
  let cart_data = await response.json();
  if (response.ok) {
    return cart_data;
  } else {
    throw response;
  }
}

export async function PostCartRefData({
  token: token,
  ref: ref,
  lineData: lineData,
}) {
  let response = await fetch(`${API_ENDPOINT}/update_cart/${ref}/`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(lineData),
  });
  let cart_updated_data = await response.json();
  if (response.ok) {
    return cart_updated_data;
  } else {
    throw response;
  }
}

export async function DeleteCartLine({
  token: token,
  ref: ref,
  line_ids: line_ids,
}) {
  let response = await fetch(`${API_ENDPOINT}/update_cart/${ref}/`, {
    method: "DELETE",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(line_ids),
  });
  let deleted_data = await response.json();
  if (response.ok) {
    return deleted_data;
  } else {
    throw response;
  }
}

// user profile apis -> POST
export async function PostUserData({ token: token, userData: userData }) {
  // TODO : token does not required in creating a user have to remove the token from the API
  let response = await fetch(`${API_ENDPOINT}/create-user/`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  let user_updated_data = await response.json();
  if (response.ok) {
    return user_updated_data;
  } else {
    throw response;
  }
}

export async function postForgotEmail({ Data: Data }) {
  let response = await fetch(`${API_ENDPOINT}/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Data),
  });
  let profile_data = await response.json();
  if (response.ok) {
    return profile_data;
  } else {
    throw response;
  }
}

export async function postValidationForgotOtp({ Data: Data }) {
  let response = await fetch(`${API_ENDPOINT}/validate-forgotpass-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Data),
  });
  let profile_data = await response.json();
  if (response.ok) {
    return profile_data;
  } else {
    throw response;
  }
}

export async function postUpdatedPasswordData({
  updatedPassword: updatedPassword,
}) {
  let response = await fetch(`${API_ENDPOINT}/change-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPassword),
  });
  let profile_data = await response.json();
  if (response.ok) {
    return profile_data;
  } else {
    throw response;
  }
}

export async function PostValidationNewUserOtp({ ValidateData: ValidateData }) {
  let response = await fetch(`${API_ENDPOINT}/validate-siginup-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ValidateData),
  });
  let profile_data = await response.json();
  if (response.ok) {
    return profile_data;
  } else {
    throw response;
  }
}

// user profile apis -> GET
export async function getProfileData({ token: token }) {
  let response = await fetch(`${API_ENDPOINT}/user-profile/`, {
    method: "GET",
    headers: { Authorization: token },
  });
  let user_data = await response.json();
  if (response.ok) {
    return user_data;
  } else {
    throw response;
  }
}

export async function getUserOrdersData({ token: token, user_id }) {
  let response = await fetch(`${API_ENDPOINT}/user-orders/${user_id}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  let user_data = await response.json();
  if (response.ok) {
    return user_data;
  } else {
    throw response;
  }
}

export async function PostProfileData({ token: token, userData: userData }) {
  let response = await fetch(`${API_ENDPOINT}/user-profile/`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  let user_updated_data = await response.json();
  if (response.ok) {
    return user_updated_data;
  } else {
    throw response;
  }
}

// order apis
export async function getOrderData({ token: token, ref: ref }) {
  let response = await fetch(`${API_ENDPOINT}/order/${ref}/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  let order_data = await response.json();
  if (response.ok) {
    return order_data;
  }
  return order_data;
}

export async function PostOrderData({
  token: token,
  ref: ref,
  orderData: orderData,
}) {
  let response = await fetch(`${API_ENDPOINT}/order/${ref}/`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  let order_data = await response.json();
  return order_data;
}

export async function PostPlaceOrder({
  token: token,
  ref: ref,
  orderData: orderData,
}) {
  let response = await fetch(`${API_ENDPOINT}/place-order/${ref}/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });

  let place_order_data = await response.json();
  return place_order_data;
}

// order address
export async function getOrderDetailAddress({ token: token, ref: ref }) {
  let response = await fetch(`${API_ENDPOINT}/order_address/${ref}/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  let order_data = await response.json();
  if (response.ok) {
    return order_data;
  }
  return order_data;
}

export async function postOrderDetailAddress({
  token: token,
  ref: ref,
  address_data,
}) {
  let response = await fetch(`${API_ENDPOINT}/order_address/${ref}/`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(address_data),
  });
  let order_address_data = await response.json();
  if (response.ok) {
    return order_address_data;
  }
  return order_address_data;
}

export async function getAddresses({ token: token }) {
  let response = await fetch(`${API_ENDPOINT}/adresses/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  let order_address_data = await response.json();
  if (response.ok) {
    return order_address_data;
  } else {
    throw response;
  }
}

export async function getDetailAddress({ token: token, id: id }) {
  let response = await fetch(`${API_ENDPOINT}/addresses/${id}/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  let order_address_data = await response.json();
  if (response.ok) {
    return order_address_data;
  } else {
    throw response;
  }
}
