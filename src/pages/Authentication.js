import React from 'react'
import { Signin } from './Signin'
import { Signup } from './Signup'
import Button from '@mui/material/Button';


const Authentication = () => {
    const [AuthPage, setAuthPage] = React.useState("signin")

    return (
        <>
            {AuthPage === "signin" ?
                <Signin setAuthPage={setAuthPage} />
                : <Signup setAuthPage={setAuthPage} />}
        </>
    )
}

export default Authentication