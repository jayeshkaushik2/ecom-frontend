import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthContext from '../context/AuthContext';
import { getUserOrdersData } from '../context/Apis';
import { UserOrders } from './UserOrders';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileInfo() {
    const [value, setValue] = React.useState(0);
    const [Orders, setOrders] = React.useState(null);
    let user = React.useContext(AuthContext)
    let token = user.AuthToken ? `Bearer ${user.AuthToken.access}` : null
    let user_id = user.user?.user_id

    const handleChange = (event, newValue) => {
        setValue(newValue);
        getData()
    };

    const getData = async () => {
        try {
            const data = await getUserOrdersData({ token: token, user_id: user_id })
            setOrders(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const tabStyle = {
        paddingTop: 2
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Present order" {...a11yProps(0)} />
                    <Tab label="Cancelled orders" {...a11yProps(1)} />
                    <Tab label="Completed Order" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Box sx={{
                maxHeight: "500px",
                overflow: "auto"
            }}>
                <Box sx={tabStyle} value={value} index={0}>
                    <UserOrders orders={Orders} />
                </Box>
            </Box>
        </Box>
    );
}
