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
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={props.product.images[0]["image"]}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ margin: '0', fontWeight: 'bold' }}>
                    {props.product.title}
                </Typography>
                <Typography gutterBottom component="div" variant="subtitle1" sx={{ margin: '0' }}>
                    {props.product.description.slice(0, 30)}...
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" sx={buttonStyle}>Add to cart <ShoppingCartIcon /></Button>
                <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
            </CardActions>
        </Card>
    );
}

export default CategoryCard;