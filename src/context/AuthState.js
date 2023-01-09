import AuthContext from "./AuthContext";
import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CreateApiContext } from "./Apis";

const AuthState = ({ children }) => {
  const [User, setUser] = useState(() =>
    localStorage.getItem("AuthToken")
      ? jwt_decode(JSON.parse(localStorage.getItem("AuthToken")).access)
      : null
  );

  const [AuthToken, setAuthToken] = useState(() =>
    localStorage.getItem("AuthToken")
      ? JSON.parse(localStorage.getItem("AuthToken"))
      : null
  );

  const [Login, setLogin] = useState(
    localStorage.getItem("AuthToken") ? "Logout" : "Login"
  );

  const redirect = useNavigate();

  let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  let LoginUser = async (e, user_info) => {
    let response = await fetch(`${API_ENDPOINT}/token/`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user_info),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setLogin("Logout");
      setUser(jwt_decode(data.access));
      localStorage.setItem("AuthToken", JSON.stringify(data));
      redirect("/");
    } else {
      alert("unable to login");
    }
  };

  let RefreshUserAccess = async () => {
    let response = await fetch(`${API_ENDPOINT}/token/refresh/`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refresh: AuthToken.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.getItem("AuthToken", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  // let LoginUser = async (e, info) => {
  //   let res = await CreateApiContext("/login/", "POST", info);
  //   setAuthToken(res);
  //   setLogin("Logout");
  //   setUser(jwt_decode(res.access));
  //   localStorage.setItem("AuthToken", JSON.stringify(res));
  //   localStorage.removeItem("Cart");
  //   console.log("logged in data", res);
  //   redirect("/");
  // };

  // let RefreshUserAccess = async () => {
  //   let res = await CreateApiContext("/token/refresh/", "POST", {
  //     refresh: AuthToken.refresh,
  //   });
  //   if (res.status === 200) {
  //     setAuthToken(res);
  //     setUser(jwt_decode(res.access));
  //     localStorage.getItem("AuthToken", JSON.stringify(res));
  //   } else {
  //     LogoutUser();
  //   }
  // };

  const LogoutUser = () => {
    setAuthToken(null);
    setUser(null);
    setLogin("Login");
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("Cart");
    redirect("/");
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    setLogin("Login");
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("Cart");
    redirect("/");
  };

  let userData = {
    user: User,
    AuthToken: AuthToken,
    login: Login,
    loginUser: LoginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (AuthToken) {
        RefreshUserAccess();
      }
    }, 4 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [AuthToken]);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthState;
