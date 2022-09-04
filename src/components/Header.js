import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { getSubCategory } from '../context/Apis'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Badge from '@mui/material/Badge';


export const Header = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [SubCategory, setSubCategory] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);
    };

    // const getData = async () => {
    //     try {
    //         const data = await getSubCategory()
    //         setSubCategory(data["results"])
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }
    // React.useEffect(() => {
    //     getData()
    // }, [])

    const YourCartMobileStyle = {
        color: "white",
    }

    const YourCartStyle = {
        marginTop: "22px",
        borderRadius: "50%",
        height: "50%",
        marginTop: "0px",
        padding: "6px",
    }


    return (
        <AppBar position="static" sx={{ maxWidth: "100%" }}>
            <Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {props.SubCategory?.map((sub_category, index) => (
                            <MenuItem key={index} onClick={handleCloseNavMenu} value={sub_category["name"]}>
                                <Link href={`/category/?query=${sub_category.name}`} underline="none" color="inherit">
                                    <Typography textAlign="center" >{sub_category.name}</Typography>
                                </Link>
                            </MenuItem>

                        ))}
                        <MenuItem sx={YourCartMobileStyle}>
                            <Link href="/order" underline="none" color="black">
                                Your Cart
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {props.SubCategory?.map((sub_category, index) => (
                        <Link href={`/category/?query=${sub_category.name}`} key={index} underline="none" color="inherit" params={{ query: sub_category.name }}>
                            <Button
                                value={sub_category.name}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                            >
                                {sub_category["name"]}
                            </Button>
                        </Link>
                    ))}
                    <Box style={YourCartStyle}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={props.num_product} color="error">
                                <Link href="/order" underline="none" color="inherit">
                                    <ShoppingCartCheckoutIcon sx={{ fontSize: "30px" }} />
                                </Link>
                            </Badge>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </AppBar >
    );
};