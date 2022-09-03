import React from 'react'
import { Signup } from './Signup'
import Button from '@mui/material/Button';
import { Signin } from './Signin';


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