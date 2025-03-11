import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Footer from './Footer';
import Header from './Header';
import { JSX } from 'react/jsx-runtime';
import Paper from '@mui/material/Paper';


type ViewportProps = {
    children: React.ReactNode;
}

const Viewport = ({ children }: ViewportProps): JSX.Element => {

    return (
        <>
            <Header />
            <Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
            >
                <Container maxWidth="lg">
                    <Paper sx={{ px: 2, py: 2 }}>
                        {children}
                    </Paper>
                </Container>
                <Footer />
            </Box >
        </>
    );
}

export default Viewport;
