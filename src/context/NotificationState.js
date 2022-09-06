import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import NotificationContext from './NotificationContext'
import Notify from './Notify';

const NotificationState = ({ children }) => {
  const [ShowMsg, setShowMsg] = React.useState(null)

  const sendNotification = ({ type: type, msg: msg }) => {
    alert(`Type:${type}, ${msg}`)
    // return (
    //   <Notify data={{type: type, msg: msg, show: true }} />
    // )
  }

let notify = {
  sendNotification: sendNotification
}


return (
  <NotificationContext.Provider value={notify}>
    {children}
  </NotificationContext.Provider>
)
}


export default NotificationState