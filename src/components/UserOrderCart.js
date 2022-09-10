import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import CartLine from './CartLine';
import { Box } from '@mui/system';
import NoDataFound from '../pages/NoDataFound';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function UserOrderCart(props) {
    const [cartLines, setCartLines] = React.useState(null)
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)

    const getData = async () => {
        try {
            let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
            let ref = cart?.cartRef
            let response = await cart?.getCartData({ token: token, ref: ref })
            console.log(response?.lines)
            setCartLines(response?.lines)
        }
        catch (error) {
            console.log(error)
        }
    }
    if (props?.open === true){
        getData()
    }

    return (
        <Box>
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Items
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {cartLines?.length > 0 ? cartLines.map((line, index) => (
                        <CartLine key={index} line={line} getUpdatedData={getData} />
                    )) :
                        <Box sx={{
                            maxWidth: "100%",
                            maxHeight: "270px",
                            overflow: "hidden"
                        }}>
                            <NoDataFound />
                        </Box>}
                </DialogContent>
            </BootstrapDialog>
        </Box>
    );
}
