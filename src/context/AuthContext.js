import { React, createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
export default AuthContext;


export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(() => localStorage.getItem("AuthToken") ? jwt_decode(JSON.parse(localStorage.getItem("AuthToken")).access) : null)
    const [AuthToken, setAuthToken] = useState(() => localStorage.getItem("AuthToken") ? JSON.parse(localStorage.getItem("AuthToken")) : null)
    const history = useNavigate()

    
    let loginUser = async (e, user_info) => {
        console.log("authenticating with data...", user_info)
        let response = await fetch("https://ecom-backend-j.herokuapp.com/token/", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user_info)
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthToken(data)
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
        let response = await fetch("https://ecom-backend-j.herokuapp.com/token/refresh/", {
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
            alert("unable to refresh token")
            logoutUser()
        }
    }

    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("AuthToken")
    }

    let contextData = {
        user: User,
        AuthToken: AuthToken,
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
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )

}