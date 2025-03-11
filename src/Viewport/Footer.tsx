import { JSX } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer = (): JSX.Element => {
    return (
        <Box component="footer"
            sx={{ backgroundColor: 'primary', display: "flex", justifyContent: "center", py: 5, px: 2, mt: 'auto' }}>
            <Copyright />
        </Box>
    );
}

export default Footer;

const Copyright = (): JSX.Element => {
    return (
        <Typography variant="body2" >
            {'Copyright © '}
            <Link underline="none" >
                FlexIQ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}