import AuthContext from './AuthContext'
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";



const AuthState = ({ children }) => {

    const [User, setUser] = useState(() => localStorage.getItem("AuthToken") ? jwt_decode(JSON.parse(localStorage.getItem("AuthToken")).access) : null)

    const [AuthToken, setAuthToken] = useState(() => localStorage.getItem("AuthToken") ? JSON.parse(localStorage.getItem("AuthToken")) : null)

    const [Login, setLogin] = useState(localStorage.getItem("AuthToken") ? "Logout" : "Login")

    const history = useNavigate()

    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    let loginUser = async (e, user_info) => {
        let response = await fetch(`${API_ENDPOINT}/token/`, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user_info)
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthToken(data)
            setLogin("Logout")
            setUser(jwt_decode(data.access))
            localStorage.setItem("AuthToken", JSON.stringify(data))
            history("/")
        }
        else {
            alert("unable to login")
        }
    }

    let RefreshUserAccess = async () => {
        console.log("refreshing token...")
        let response = await fetch(`${API_ENDPOINT}/token/refresh/`, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ "refresh": AuthToken.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            console.log("token refreshed")
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.getItem("AuthToken", JSON.stringify(data))
        }
        else {
            console.log("unable to refresh token")
            logoutUser()
        }
    }

    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        setLogin("Login")
        localStorage.removeItem("AuthToken")
    }

    let userData = {
        user: User,
        AuthToken: AuthToken,
        login: Login,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (AuthToken) {
                RefreshUserAccess()
            }
        }, 5 * 60 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [AuthToken,])

    return (
        <AuthContext.Provider value={userData} >
            {children}
        </AuthContext.Provider>
    )
}


export default AuthState