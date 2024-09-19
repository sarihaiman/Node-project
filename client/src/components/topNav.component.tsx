import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom';

export default function TopNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ marginBottom: '20px' , marginLeft: '8px' ,display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' }} }}>
      <img src={logo} alt="Logo" style={{marginLeft: '30px', marginRight: '5px', height:'50px'}} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" component={Link} to="/home"/>
        <Tab label="gallery" component={Link} to="/gallery"/>
        <Tab label="orders" component={Link} to="/order"/>
        <Tab label="contact" component={Link} to="/contact"/>
      </Tabs>
    </Box>
  );
}
