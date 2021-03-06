import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Colors from './Colors.js'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

const settings = ['Profile', 'Login'];

const ResponsiveAppBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const main_color_dark = Colors("main_color_dark")
    let navigate = useNavigate();
    let { user } = React.useContext(AuthContext)
    let { logoutUser } = React.useContext(AuthContext)

    React.useEffect(() => {
        let interval = setInterval(() => {
            if (user) {
                console.log("user available")
                settings.pop()
                settings.push("Logout")
            }
            else {
                console.log("user not available")
                settings.pop()
                settings.push("Login")
            }
        }, 5 * 1000);
        return () => {
            clearInterval(interval)
        }
    }, [user,])


    const handleSearch = (e) => {
        let query = e.target.value
        if (query === undefined || typeof(query) !== "string"){
            query = e.target.innerText
        }
        if (query !== "") {
            navigate(`/products/?query=${query}`, { state: { "query": query } })
        }
    }


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (page) => {
        if (page === "Login") {
            navigate("/signin")
        }
        else if (page === "Logout") {
            logoutUser()
        }
        else if (page === "Profile") {
            navigate("/profile")
        }
        setAnchorElUser(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        // marginLeft: "auto",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '50ch',
                '&:focus': {
                    width: '50ch',
                },
            },
        },
    }));

    return (
        <AppBar position="static" sx={{ position: "sticky", top: 0, zIndex: "100", maxWidth: "100%" }}>
            <Box sx={{ backgroundColor: main_color_dark, paddingLeft: "10px", paddingRight: "10px" }}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EcomBUY
                    </Typography>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EcomBUY
                    </Typography>

                    <Box sx={{ mr: '10px', ml: '100px', flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: "auto" }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onKeyPress={(e) => { if (e.key === "Enter") { handleSearch(e) } }}
                                placeholder="Search your product"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
};
export default ResponsiveAppBar;
