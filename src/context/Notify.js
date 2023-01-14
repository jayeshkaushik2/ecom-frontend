import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Notify = (props) => {
  console.log("running notify...");

  const handleOnClose = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.data?.show}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5 * 6000}
        onClose={handleOnClose}
      >
        <Alert
          onClose={handleOnClose}
          severity={props.data?.type}
          sx={{ width: "100%" }}
        >
          {props.data?.msg ? props.data?.msg : null}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notify;
