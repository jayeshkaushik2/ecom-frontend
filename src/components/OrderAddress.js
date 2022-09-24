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
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { postOrderDetailAddress } from '../context/Apis';



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
    let cart = React.useContext(CartContext)
    let user = React.useContext(AuthContext)
    let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
    let ref = cart?.cartRef
    const [OrderAddress, setOrderAddress] = React.useState(null)
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
            const response = await postOrderDetailAddress({token:token, ref:ref, address_data:data})
            setOrderAddress(response)
            console.log("response.data", response)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(
        () => {
            setFullName(props?.OrderAddressData?.full_name)
            setPhone(props?.OrderAddressData?.phone)
            setAlternatePhone(props?.OrderAddressData?.alternate_phone)
            setPincode(props?.OrderAddressData?.pincode)
            setCity(props?.OrderAddressData?.city)
            setAreaInfo(props?.OrderAddressData?.area_info)
            setHouseInfo(props?.OrderAddressData?.house_info)
            setState(props?.OrderAddressData?.state)
        },[])


    const handleNewAddress = () => {
            setFullName("")
            setPhone("")
            setAlternatePhone("")
            setPincode("")
            setCity("")
            setAreaInfo("")
            setHouseInfo("")
            setState("")
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
                        value={FullName}
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
                        value={Phone}
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
                        value={AlternatePhone}
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
                        value={Pincode}
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
                        value={City}
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
                        value={AreaInfo}
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
                        value={HouseInfo}
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
                        value={State}
                        size="small"
                        onChange={(e) => setState(e.target.value)}
                    />
                    <DialogActions>
                        <Button disabled onClick={handleNewAddress}>
                            Add new address
                        </Button>
                        <Button onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleSaveAddress}>
                            Save Changes
                        </Button>
                    </DialogActions>
                </DialogContent>
            </BootstrapDialog>
        </Box>
    );
}
