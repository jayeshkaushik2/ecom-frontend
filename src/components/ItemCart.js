import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import background from '../assets/images/background.jpg'


export default function ItemCart() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={background}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">Add to cart</Button>
        <Button size="small" variant="outlined" sx={{marginLeft: 'auto'}}>View More</Button>
      </CardActions>
    </Card>
  );
}
