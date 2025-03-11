import React from 'react';

import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


export const LoginLogoutFlow = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const settings = ['Profile', 'Logout'];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        switch (setting) {
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
                        <Typography sx={{ color: 'white', mr: 1 }}>{user?.name}</Typography>
                        <Avatar alt="Remy Sharp" src={user?.picture} />
                    </IconButton>
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
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    {/* <LogoutButton /> */}
                </>
                :
                <LoginButton />
            }
        </Box>
    );
};