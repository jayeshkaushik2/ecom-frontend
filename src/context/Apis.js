const API_URL = process.env.REACT_APP_API_ENDPOINT;

function update_quary_params(url, filters) {
  // this function will add the query params to the api url
  let is_first = true;
  for (var key in filters) {
    if (is_first) {
      url += `?${key}=${filters[key]}`;
      is_first = false;
    } else {
      url += `&${key}=${filters[key]}`;
    }
  }
  return url;
}

export async function getFooter() {
  let response = await fetch(`${API_URL}/details/`, {
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
  let response = await fetch(`${API_URL}/sub_category/`, {
    method: "GET",
  });
  let sub_category_data = await response.json();
  if (response.ok) {
    return sub_category_data;
  } else {
    throw response;
  }
}

export async function getProductData({ filters: filters }) {
  let api_url = `${API_URL}/product/`;
  api_url = update_quary_params(api_url, filters);
  let response = await fetch(api_url, {
    method: "GET",
  });
  let product_data = await response.json();
  return product_data;
}

export async function getProductIdData({
  productId: productId,
  filters: filters,
}) {
  let api_url = `${API_URL}/product/${productId}`;
  api_url = update_quary_params(api_url, filters);
  let response = await fetch(api_url, {
    method: "GET",
  });
  let product_data = await response.json();
  return product_data;
}

export async function getProductData_WithFilter({
  search_with: search_with,
  query: query,
}) {
  let response = await fetch(`${API_URL}/product/?${search_with}=${query}`, {
    method: "GET",
  });
  let filtered_product_data = await response.json();
  if (response.ok) {
    return filtered_product_data;
  } else {
    throw response;
  }
}

export async function getHomepageData() {
  let response = await fetch(`${API_URL}/homepage/`);
  let homepage_data = await response.json();
  if (response.ok) {
    return homepage_data;
  } else {
    throw response;
  }
}

export async function getCartRef({ token: token }) {
  let response = await fetch(`${API_URL}/create_cart/`, {
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
  let response = await fetch(`${API_URL}/update_cart/${ref}/`, {
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
  let response = await fetch(`${API_URL}/update_cart/${ref}/`, {
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
  let response = await fetch(`${API_URL}/update_cart/${ref}/`, {
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
  let response = await fetch(`${API_URL}/create-user/`, {
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
  let response = await fetch(`${API_URL}/forgot-password/`, {
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
  let response = await fetch(`${API_URL}/validate-forgotpass-otp/`, {
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
  let response = await fetch(`${API_URL}/change-password/`, {
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
  let response = await fetch(`${API_URL}/validate-siginup-otp/`, {
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
  let response = await fetch(`${API_URL}/user-profile/`, {
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

export async function getUserOrdersData({
  token: token,
  filters: filters,
  user_id,
}) {
  let api_url = `${API_URL}/user-orders/${user_id}/`;
  api_url = update_quary_params(api_url, filters);
  let response = await fetch(api_url, {
    method: "GET",
    headers: { Authorization: token },
  });
  let user_data = await response.json();
  return user_data;
}

export async function PostProfileData({ token: token, userData: userData }) {
  let response = await fetch(`${API_URL}/user-profile/`, {
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
  let response = await fetch(`${API_URL}/order/${ref}/`, {
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
  let response = await fetch(`${API_URL}/order/${ref}/`, {
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
  let response = await fetch(`${API_URL}/place-order/${ref}/`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });

  let place_order_data = await response.json();
  return place_order_data;
}

// order address
export async function getOrderDetailAddress({ token: token, ref: ref }) {
  let response = await fetch(`${API_URL}/order_address/${ref}/`, {
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
  let response = await fetch(`${API_URL}/order_address/${ref}/`, {
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
  let response = await fetch(`${API_URL}/adresses/`, {
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
  let response = await fetch(`${API_URL}/addresses/${id}/`, {
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

export async function registerUser(info) {
  let resp = await fetch(`${API_URL}/register-user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  let resp_json = await resp.json();
  return resp_json;
}
// added Create API context functionality
function createRequest(request_method, request_data, token, is_default = true) {
  // creates the request info for the fetch request.
  let req = {};
  let headers = {};
  if (is_default === true) {
    headers["Content-Type"] = "application/json";
  } else {
    headers["Content-Type"] = "multipart/form-data";
  }

  if (token !== null && token !== undefined) {
    headers["access"] = `Bearer ${token}`;
  }

  req["method"] = request_method;
  if (
    request_data !== {} &&
    request_data !== null &&
    request_data !== undefined &&
    (request_method === "POST" || request_method === "PATCH")
  ) {
    req["body"] = JSON.stringify(request_data);
  }
  req["headers"] = headers;
  return req;
}

function updateUrlFilter(url, filters) {
  // update the filters to url
  let new_url = url;
  let is_first = true;
  if (filters !== null) {
    let is_changed = false;
    for (var key in filters) {
      if (is_first === true) {
        new_url += `?${key}=${filters[key]}`;
        is_first = false;
      } else {
        new_url += `&${key}=${filters[key]}`;
      }
      is_changed = true;
    }
    if (is_changed == true) {
      new_url += "/";
    }
  }
  console.log("url", new_url, url);
  return new_url;
}

export async function CreateApiContext(
  api_point,
  request_method,
  request_data = null,
  filters = null,
  token = null
) {
  // create the API context, sends the request to API.
  let URL = `${API_URL}${api_point}`;
  URL = updateUrlFilter(URL, filters);
  let req = createRequest(request_method, request_data, token);
  console.log(req);
  let resp = await fetch(URL, req);
  let resp_json = await resp.json();
  return resp_json;
}
