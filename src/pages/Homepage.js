import React from 'react'
import { Home } from '../components/Home';
import Notifications from '../context/NotificationState';

export const Homepage = (props) => {
    const [ShowMsg, setShowMsg] = React.useState({ show: false, type: "error", msg: null })

    return (
        <>
            <Home HomepageData={props.HomepageData} />
        </>
    )
}
