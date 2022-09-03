import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AuthContext from '../context/AuthContext';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../context/Apis'

const ResponsiveAppBar = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let redirect = useNavigate()
    let userData = React.useContext(AuthContext)
    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [ProfileuserData, setProfileuserData] = React.useState(null)

    const getData = async () => {
        try {
            let token = userData.AuthToken ? `Bearer ${userData.AuthToken.access}` : null
            if (token !== null && userData.Login !== "Login" && userData.AuthToken !== null) {
                const data = await getProfileData({ token: token })
                setProfileuserData(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const handleSearch = (e) => {
        let query = e.target.value
        props.setQuery(query)
        redirect("/products")
    }


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        userData.logoutUser()
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
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
            <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
                                <Avatar
                                    src={ProfileuserData?.profile_image ? `${API_ENDPOINT}${ProfileuserData.profile_image}` : "/static/images/avatar/1.jpg"} />
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
                            {userData?.user ?
                                <MenuItem onClick={() => handleCloseUserMenu()}>
                                    <Link href="/profile" underline="none" color="inherit">
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                : null}

                            {userData?.login === "Login" && userData.user === null ?
                                <MenuItem onClick={() => handleCloseUserMenu()}>
                                    <Link href="/authentication" underline="none" color="inherit">
                                        <Typography textAlign="center">Login</Typography>
                                    </Link>
                                </MenuItem>
                                :

                                <MenuItem onClick={() => handleCloseUserMenu()}>
                                    <Link onClick={handleLogout} underline="none" color="inherit">
                                        <Typography textAlign="center">Logout</Typography>
                                    </Link>
                                </MenuItem>}
                        </Menu>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
};
export default ResponsiveAppBar;
