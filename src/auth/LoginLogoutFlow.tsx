import React from 'react';

import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Styles } from '@/theme/Styles';

interface UserMenuProps {
    settings: string[];
    anchorEl: null | HTMLElement;
    handleClose: (setting: string) => void;
}

const UserMenu = ({ settings, anchorEl, handleClose }: UserMenuProps) => (
    <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => handleClose('')}
    >
        {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => handleClose(setting)}>
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
        ))}
    </Menu>
);

export const LoginLogoutFlow = () => {
    const width = window.innerWidth
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const largeScreenSettings = ['Profile', 'Logout'];

    const smallScreenSettings = ['Workout', 'Monthly', 'Contact', 'Profile', 'Logout'];
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        switch (setting) {
            case 'Workout':
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
                        <Typography sx={{ color: 'white', mr: 1, display: Styles.LargeScreenDisplay }}>{user?.name}</Typography>
                        <Avatar alt="Remy Sharp" sx={{ display: Styles.LargeScreenDisplay }} src={user?.picture} />
                        <MenuIcon sx={{ color: "white", display: Styles.SmallScreenDisplay }} />
                    </IconButton>
                    <>
                        {width < 800 &&
                            <UserMenu settings={smallScreenSettings} anchorEl={anchorElUser} handleClose={handleCloseUserMenu} />

                        }
                        {width > 800 &&
                            <UserMenu settings={largeScreenSettings} anchorEl={anchorElUser} handleClose={handleCloseUserMenu} />
                        }
                    </>
                </>
                :
                <LoginButton />
            }
        </Box>
    );
};