import React from 'react';

import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


export const LoginLogoutFlow = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const largeScreenSettings = ['Profile', 'Logout'];

    const smallScreenSettings = ['Workouts', 'Monthly', 'Contact', 'Profile', 'Logout'];
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        switch (setting) {
            case 'Workouts':
                // Navigate to workouts page
                console.log('Navigate to Workouts');
                navigate('/calculate-workout');
                break;
            case 'Monthly':
                // Navigate to monthly page
                console.log('Navigate to Monthly');
                navigate('/calculate-monthly');
                break;
            case 'About':
                // Navigate to about page
                console.log('Navigate to About');
                navigate('/about');
                break;
            case 'Contact':
                // Navigate to contact page
                console.log('Navigate to Contact');
                navigate('/contact');
                break;
            case 'Profile':
                // Navigate to profile page
                console.log('Navigate to Profile');
                navigate('/profile');
                break;
            case 'Logout':
                // Perform logout action
                console.log('Perform Logout');
                logout({ logoutParams: { returnTo: window.location.origin } })
                break;
            default:
                break;
        }
    };

    return (
        <Box>
            {isAuthenticated ?
                <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Typography sx={{ color: 'white', mr: 1, display: { xs: "none", sm: "none", md: "flex" } }}>{user?.name}</Typography>
                        <Avatar alt="Remy Sharp" sx={{ display: { xs: "none", sm: "none", md: "flex" } }} src={user?.picture} />
                        <MenuIcon sx={{ color: "white", display: { md: "none" } }} />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px', display: { xs: "none", sm: "none", md: "flex" } }}
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
                        {largeScreenSettings.map((largeScreenSetting) => (
                            <MenuItem key={largeScreenSetting} onClick={() => handleCloseUserMenu(largeScreenSetting)}>
                                <Typography sx={{ textAlign: 'center' }}>{largeScreenSetting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu
                        sx={{ mt: '45px', display: { md: "none" } }}
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
                        {smallScreenSettings.map((smallScreenSetting) => (
                            <MenuItem key={smallScreenSetting} onClick={() => handleCloseUserMenu(smallScreenSetting)}>
                                <Typography sx={{ textAlign: 'center' }}>{smallScreenSetting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
                :
                <LoginButton />
            }
        </Box>
    );
};