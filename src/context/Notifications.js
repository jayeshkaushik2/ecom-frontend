import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

export default function Notifications(props) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
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

  const handleOnClose = () => {
    props.setShowMsg({ show: false, type: "error", msg: null })
  }

  return (
    <div>
      <Snackbar open={props.ShowMsg?.show} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} autoHideDuration={5 * 6000} onClose={handleOnClose}>
        <Alert onClose={handleOnClose} severity={props.ShowMsg?.type} sx={{ width: '100%' }}>
          {props.ShowMsg?.msg ? props.ShowMsg?.msg : null}
        </Alert>
      </Snackbar>
    </div>
  );
}