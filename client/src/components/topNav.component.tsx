import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.jpg'

export default function TopNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' }} }}>
      <img src={logo} alt="Logo" style={{ marginRight: '5px', height:'50px'}} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" />
        <Tab label="gallery" />
        <Tab label="orders" />
        <Tab label="contact" />
      </Tabs>
    </Box>
  );
}
