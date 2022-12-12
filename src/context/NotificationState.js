import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NotificationContext from "./NotificationContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationState = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const sendNotification = ({ type: type, msg: msg }) => {
    setOpen(true);
    alert(`${type}: ${msg}`);
    // return (
    //   <div>
    //     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //       <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
    //         {msg ? msg : "server error"}
    //       </Alert>
    //     </Snackbar>
    //   </div>
    // );
  };

  let notify = {
    sendNotification: sendNotification,
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
