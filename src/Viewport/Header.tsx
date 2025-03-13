import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';

import { LoginLogoutFlow } from '../auth/LoginLogoutFlow';

const navLinks = [
  { name: "Workout", path: "/calculate-workout" },
  { name: "Monthly", path: "/calculate-monthly" },
  { name: "Contact", path: "/contact" }
];

const Header = (): React.ReactNode => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
              onClick={() => navigate('/')}
            >
              FlexIQ
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((navLink) => (
              <Button
                key={navLink.path}
                onClick={() => navigate(navLink.path)}
                sx={{ my: 2, color: 'white', display: { sm: "none", md: "block" } }}
              >
                {navLink.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ ml: "auto" }}>
            <LoginLogoutFlow />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navLinks.map((navLink) => (
                <MenuItem key={navLink.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{navLink.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
