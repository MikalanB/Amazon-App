import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

    export default function OrdersTab(props) {
    
    const {allOrdersTab, buyAgainTab} = props;
    const [value, setValue] =       React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Orders" {...a11yProps(0)} style={{color: "#007185"}} />
            {/* <Tab label="Buy Again" {...a11yProps(1)} /> */}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {allOrdersTab}
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
            <span className="test">
                <span className="test-2">{buyAgainTab}</span>
            </span>
        </TabPanel> */}
        </Box>
    );
}
