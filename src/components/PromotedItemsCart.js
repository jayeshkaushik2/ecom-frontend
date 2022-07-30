import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating'
import Colors from './Colors.js'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import defaultImage from '../assets/images/defaultImage.png'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PromotedItemsCart = (props) => {
    const main_color = Colors("main_color")
    const main_color_dark = Colors("main_color_dark")

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    const buttonStyle = {
        backgroundColor: main_color,
        '&:hover': {
            backgroundColor: main_color_dark
        }
    }

    return (
        <Box id="promoted-items">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={props.product.images.length > 0 ? props.product.images[0]["image"] : defaultImage}
                    alt="promoted item image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.product.title}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Box sx={{ display: "flex" }}>
                            <Button size="small" variant="contained" sx={buttonStyle}>Buy now<ShoppingCartIcon /></Button>
                            <Button size="small" variant="outlined" sx={{
                                color: main_color, '&:hover': {
                                    color: main_color_dark
                                },
                                marginLeft: '20px'

                            }}>Add to cart<ShoppingCartIcon /></Button>
                        </Box>
                        <Typography variant="h6" sx={{
                            borderRadius: "5px",
                            width: "fit-content",
                            padding: "5px",
                            color: "grey",
                        }}>Price:{props.product.price}<CurrencyRupeeIcon sx={{ fontSize: "14px" }} /></Typography>
                        <Typography style={{ padding: "0px" }}>
                            {props.product.description.length > 100 ? (
                                props.product.description.slice(0, 100)
                            )
                                : props.product.description}
                        </Typography>
                        <Button size="small" variant="text" sx={{ marginLeft: 'auto', color: main_color_dark }}>View More <ArrowForwardIcon sx={{ fontSize: '15px' }} /></Button>
                    </CardContent>
                </Collapse>
            </Card>
        </Box >
    )
}

export default PromotedItemsCart