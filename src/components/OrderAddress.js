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
import TextField from '@mui/material/TextField';




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

export default function OrderAddress(props) {
    const [FullName, setFullName] = React.useState("")
    const [Phone, setPhone] = React.useState("")
    const [AlternatePhone, setAlternatePhone] = React.useState("")
    const [Pincode, setPincode] = React.useState("")
    const [City, setCity] = React.useState("")
    const [AreaInfo, setAreaInfo] = React.useState("")
    const [HouseInfo, setHouseInfo] = React.useState("")
    const [State, setState] = React.useState("")

    const handleSaveAddress = async () => {
        try {
            let data = {
                full_name: FullName,
                phone: Phone,
                alternate_phone: AlternatePhone,
                pincode: Pincode,
                city: City,
                area_info: AreaInfo,
                house_info: HouseInfo,
                state: State,
            }
            console.log(data)
            // const response = await PostAddress()

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title">
                    Address Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="full_name"
                        label="Full Name"
                        name="full_name"
                        autoComplete="full_name"
                        value={props?.OrderAddressData?.full_name}
                        size="small"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        value={props?.OrderAddressData?.phone}
                        size="small"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="alternate_phone"
                        label="Alternate phone"
                        name="alternate_phone"
                        autoComplete="alternate_phone"
                        value={props?.OrderAddressData?.alternate_phone}
                        size="small"
                        onChange={(e) => setAlternatePhone(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="pincode"
                        label="Pincode"
                        name="pincode"
                        autoComplete="pincode"
                        value={props?.OrderAddressData?.pincode}
                        size="small"
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        value={props?.OrderAddressData?.city}
                        size="small"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="Area_info"
                        label="Area, near by locations, etc."
                        name="Area_info"
                        autoComplete="Area_info"
                        value={props?.OrderAddressData?.area_info}
                        size="small"
                        onChange={(e) => setAreaInfo(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="house_info"
                        label="House number, colony, etc."
                        name="full_name"
                        autoComplete="full_name"
                        value={props?.OrderAddressData?.house_info}
                        size="small"
                        onChange={(e) => setHouseInfo(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        autoComplete="state"
                        value={props?.OrderAddressData?.state}
                        size="small"
                        onChange={(e) => setState(e.target.value)}
                    />
                    <DialogActions>
                        <Button onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleSaveAddress}>
                            Save Changes
                        </Button>
                        <Button>
                            Add new address
                        </Button>
                    </DialogActions>
                </DialogContent>
            </BootstrapDialog>
        </Box>
    );
}
