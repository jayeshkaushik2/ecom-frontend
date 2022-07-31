import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Colors from './Colors.js'
import { useNavigate } from 'react-router-dom';


export const Header = (props) => {
    const main_color = Colors("main_color")
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [SubCategory, setSubCategory] = React.useState(null)
    let navigate = useNavigate();
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        console.log("subcategory clicked...")
        let query = e.target.value
        if (query === undefined || typeof(query) !== "string"){
            query = e.target.innerText
        }
        if (query !== "") {
            navigate(`/category/?sub_category=${query}`, { state: { "query": query } })
        }
        setAnchorElNav(null);
    };

    const getSubCategory = async () => {
        let response = await fetch(`${API_ENDPOINT}/sub_category/`)
        let data = await response.json()
        setSubCategory(data["results"])
    }

    React.useEffect(() => {
        getSubCategory()
    }, [])


    return (
        <AppBar position="static" sx={{maxWidth:"100%"}}>
            <Box sx={{ backgroundColor: main_color }}>
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
                        {SubCategory?.map((sub_category, index) => (
                            <MenuItem key={index} onClick={handleCloseNavMenu} value={sub_category["name"]}>
                                <Typography textAlign="center" >{sub_category["name"]}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {SubCategory?.map((sub_category, index) => (
                        <Button
                            key={index}
                            onClick={handleCloseNavMenu}
                            value={sub_category["name"]}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {sub_category["name"]}
                        </Button>
                    ))}
                </Box>
            </Box>
        </AppBar >
    );
};