import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import background from '../assets/images/background.jpg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Colors from './Colors.js'

export default function ItemCart() {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const buttonStyle = {
        backgroundColor:main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={background}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{margin: '0'}}>
                    Lizard
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" sx={buttonStyle}>Add to cart <ShoppingCartIcon /></Button>
                <Button size="small" variant="text" sx={{ marginLeft: 'auto', color:main_color_dark }}>View More <ArrowForwardIcon sx={{fontSize: '15px'}} /></Button>
            </CardActions>
        </Card>
    );
}
