import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Colors from './Colors.js'
import defaultImage from '../assets/images/defaultImage.png'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Rating from '@mui/material/Rating'

const CategoryCard = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const buttonStyle = {
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    return (
        <Card sx={{ maxWidth: "95%", marginLeft:"10px" }} >
            <CardMedia
                component="img"
                height="140"
                image={props.product.images?.length > 0 ? props.product.images[0]["image"] : defaultImage}
                alt="green iguana"
            />
            <CardContent sx={{display:"flex"}}>
                <Typography gutterBottom variant="h6" component="div" sx={{ margin: '0', fontSize: "17px" }}>
                    Price: {props.product.price}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} />
                </Typography>
                <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" sx={buttonStyle}>Add to cart <ShoppingCartIcon /></Button>
                <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
            </CardActions>
        </Card>
    );
}

export default CategoryCard;