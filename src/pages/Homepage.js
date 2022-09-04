import React from 'react'
import { Home } from '../components/Home';
import Notifications from '../context/Notifications';

export const Homepage = (props) => {
    const [ShowMsg, setShowMsg] = React.useState({ show: false, type: "error", msg: null })

    return (
        <>
            <Home HomepageData={props.HomepageData} />
            {ShowMsg ?
                <Notifications msgType="success" msg="item added to cart" ShowMsg={ShowMsg}  />
                : null}
        </>
    )
}
