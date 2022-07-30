import React from 'react'

import samsung from '../assets/images/samsung.jpg'
import Typography from '@mui/material/Typography';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import defaultImage from '../assets/images/defaultImage.png'
// import ProductView from "..components/ProductView";


// const ProductView = () => {
export default function ProductView() {
    return (
        <Card sx={{
            display: "flex",
            backgroundColor: "#bababa",
            // fontSize:"14px",
        }}>
            <img style={{
                marginTop: "auto",
                marginBottom: "auto",
                borderRadius: "13px",
            }}
                src={defaultImage}
                alt="samsung"
                loading="lazy"
            />
            <CardContent>

                <Typography className='text' gutterBottom variant="h5" component="div" style={{}}>
                    Samsung Galaxy M33 5G (Deep Ocean Blue, 6GB, 128GB Storage) | 5nm Processor | 6000mAh Battery | Voice Focus | Upto 12GB RAM with RAM Plus|Travel Adapter to be Purchased Separately
                   
                </Typography>
                <Typography variant="body1"
                    padding="5px" marginBottom="10px">
                    {/* variant="body1" */}
                    Limited time deal
                </Typography>

                <Typography variant="" color="white" backgroundColor="red" borderRadius="5px"
                    padding="5px" fontSize="17px" >
                    <sup>₹</sup>17,999
                </Typography>

                <Typography variant="" color="" padding="5px" >
                    ₹<sub>15000</sub>
                </Typography>

                <Typography variant="" color="" padding="5px" >
                    (28% off)
                </Typography>

                <Typography variant="body2" color="" padding="5px" marginBottom="10px">
                    Flat INR 2000 Off on ICICI BankCards
                </Typography>

                <Typography variant="body2" color="" padding="5px" >
                    Get it by <span style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                    }}> tomorrow, July 20</span>
                </Typography>

                <Typography variant="body2" color="" padding="5px" >
                    FREE Delivery by Amazon
                </Typography>

                <CardActions>
                    <Button size="small">Buy Now</Button>
                    <Button size="small">Add to Cart</Button>
                </CardActions>
                

            </CardContent>

        </Card>
    )
}

