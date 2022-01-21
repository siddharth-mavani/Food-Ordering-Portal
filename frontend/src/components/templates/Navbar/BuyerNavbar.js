import { useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const BuyerNavbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const setBuyerEmailEmpty = () => {
    localStorage.setItem("BuyerEmail", "");
    localStorage.setItem("VendorEmail", "");
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Food Delivery App
          </Typography>

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
              <MenuItem onClick={() => {navigate("/buyerdashboard"); handleCloseNavMenu()}}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={() => {navigate("/register"); handleCloseNavMenu()}}>
                <Typography textAlign="center">Favourites</Typography>
              </MenuItem>
              <MenuItem onClick={() => {navigate("/login"); handleCloseNavMenu()}}>
                <Typography textAlign="center">Wallet</Typography>
              </MenuItem>
              
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Food Delivery App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
              <Button onClick={() => {navigate("/buyerdashboard"); handleCloseNavMenu()}} sx={{ my: 2, color: 'white', display: 'block' }}>
                Dashboard
              </Button>

              <Button onClick={() => {navigate("/favourites"); handleCloseNavMenu()}} sx={{ my: 2, color: 'white', display: 'block' }}>
                Favourites
              </Button>

              <Button onClick={() => {navigate("/wallet"); handleCloseNavMenu()}} sx={{ my: 2, color: 'white', display: 'block' }}>
                Wallet
              </Button>
            
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
                // horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                // horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem onClick={() => {navigate("/buyerprofile"); handleCloseNavMenu()}}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={() => {navigate("/orders"); handleCloseNavMenu()}}>
                  <Typography textAlign="center">My Orders</Typography>
                </MenuItem>

                <MenuItem onClick={() => {navigate("/"); setBuyerEmailEmpty(); handleCloseNavMenu()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default BuyerNavbar;