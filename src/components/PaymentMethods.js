import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const PaymentMethods = (props) => {
    const handlePaymentMethod = (e) => {
        let order_data = {
            payment_method: e.target.value
        }
        props.PostData(order_data)
        console.log("order_data", order_data)
    }
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Choose payment method</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={props?.PaymentMethod === "cash" ? "cash": ""}
                onChange={(e) => handlePaymentMethod(e)}
            >
                <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
            </RadioGroup>
        </FormControl>
    )
}

export default PaymentMethods