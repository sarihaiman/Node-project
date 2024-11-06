import React, { useState } from 'react';
import { Box, Tabs, Tab, Popover, MenuItem, Paper } from '@mui/material';
import logo from '../assets/logo.jpg';
import profil from '../assets/profile.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction.ts';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

export default function TopNav() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const dispatch = useDispatch();

  const isAdmin: boolean = useSelector((state: any) => {
    return state.userReducer.currentUser.isAdmin;
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('currentUser')!);

    if (token && user) {
      dispatch(FillDataCurrentUser(user));
    }
  }, [dispatch]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDetails = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseDetails = () => {
    setAnchorEl2(null);
  };

  const handleCloseDetails2 = () => {
    sessionStorage.removeItem('token');
    handleCloseDetails();
  };

  // return (
  //   <>
  //     <Box sx={{ marginBottom: '20px', marginLeft: '8px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
  //       <img src={logo} alt="Logo" style={{ marginLeft: '30px', marginRight: '5px', height: '50px' }} />
  //       <Tabs value={value} onChange={handleChange}>
  //         <Tab label="home" component={Link} to="/home" />
  //         <Tab label="gallery" component={Link} to="/gallery" />
  //         <Tab label="orders" component={Link} to="/order" />
  //         <Tab label="contact" component={Link} to="/contact" />
  //         <Tab label="upload" component={Link} to="/upload" />
  //         {isAdmin && <Tab label="manager" onClick={handleOpenMenu} />}
  //       </Tabs>
  //       <Popover
  //         open={Boolean(anchorEl)}
  //         anchorEl={anchorEl}
  //         onClose={handleCloseMenu}
  //         anchorOrigin={{
  //           vertical: 'bottom',
  //           horizontal: 'center',
  //         }}
  //         transformOrigin={{
  //           vertical: 'top',
  //           horizontal: 'center',
  //         }}
  //       >
  //         <Paper>
  //           <MenuItem component={Link} to="/admin/businessDetails" onClick={handleCloseMenu}>business details</MenuItem>
  //           <MenuItem component={Link} to="/admin/potographyPackage" onClick={handleCloseMenu}>potography package</MenuItem>
  //           <MenuItem component={Link} to="/admin/orders" onClick={handleCloseMenu}>orders</MenuItem>
  //           <MenuItem component={Link} to="/admin/customers" onClick={handleCloseMenu}>customers</MenuItem>
  //           <MenuItem component={Link} to="/admin/upload" onClick={handleCloseMenu}>uploads</MenuItem>
  //           <MenuItem component={Link} to="/admin/feedback" onClick={handleCloseMenu}>feedback</MenuItem>
  //           <MenuItem component={Link} to="/admin/image" onClick={handleCloseMenu}>image</MenuItem>
  //         </Paper>
  //       </Popover>
  //     </Box>
  //     <Box sx={{ marginLeft: '80px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
  //       <Popover
  //         open={Boolean(anchorEl2)}
  //         anchorEl={anchorEl2}
  //         onClose={handleCloseDetails}
  //         anchorOrigin={{
  //           vertical: 'bottom',
  //           horizontal: 'center',
  //         }}
  //         transformOrigin={{
  //           vertical: 'top',
  //           horizontal: 'center',
  //         }}
  //       >
  //         <Paper>
  //           <MenuItem onClick={handleCloseDetails2}><Logout /> Log Out </MenuItem>
  //         </Paper>
  //       </Popover>
  //       <Button variant="contained" component={Link} to="/signIn" style={{ backgroundColor: 'white' }}>SignIn</Button>
  //       <Button variant="contained" component={Link} to="/signUp" style={{ backgroundColor: 'white', marginLeft: '10px' }}>SignUp</Button>
  //       <img src={profil} alt="Logo" style={{ cursor: 'pointer', marginLeft: '20px', height: '40px' }} onClick={handleOpenDetails} />
  //     </Box></>
  // );
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ marginLeft: '30px', marginRight: '5px', height: '50px' }} />
        <Tabs value={value} onChange={handleChange}>
          <Tab label="home" component={Link} to="/home" />
          <Tab label="gallery" component={Link} to="/gallery" />
          <Tab label="orders" component={Link} to="/order" />
          <Tab label="contact" component={Link} to="/contact" />
          <Tab label="upload" component={Link} to="/upload" />
          {isAdmin && <Tab label="manager" onClick={handleOpenMenu} />}
        </Tabs>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Paper>
            <MenuItem component={Link} to="/admin/businessDetails" onClick={handleCloseMenu}>business details</MenuItem>
            <MenuItem component={Link} to="/admin/potographyPackage" onClick={handleCloseMenu}>potography package</MenuItem>
            <MenuItem component={Link} to="/admin/orders" onClick={handleCloseMenu}>orders</MenuItem>
            <MenuItem component={Link} to="/admin/customers" onClick={handleCloseMenu}>customers</MenuItem>
            <MenuItem component={Link} to="/admin/upload" onClick={handleCloseMenu}>uploads</MenuItem>
            <MenuItem component={Link} to="/admin/feedback" onClick={handleCloseMenu}>feedback</MenuItem>
            <MenuItem component={Link} to="/admin/image" onClick={handleCloseMenu}>image</MenuItem>
          </Paper>
        </Popover>
      </Box>
      <Popover
        open={Boolean(anchorEl2)}
        anchorEl={anchorEl2}
        onClose={handleCloseDetails}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper>
          <MenuItem onClick={handleCloseDetails2}><Logout /> Log Out </MenuItem>
        </Paper>
      </Popover>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button variant="contained" component={Link} to="/signIn" style={{ backgroundColor: 'white', marginRight: '15px' }}>SignIn</Button>
        <Button variant="contained" component={Link} to="/signUp" style={{ backgroundColor: 'white', marginRight: '20px' }}>SignUp</Button>
        <img src={profil} alt="Logo" style={{ cursor: 'pointer', height: '40px', marginRight: '20px'  }} onClick={handleOpenDetails} />
      </Box>
    </Box>
  );

}