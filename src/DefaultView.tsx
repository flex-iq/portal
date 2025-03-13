import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import LoginButton from "./auth/LoginButton";

import { useNavigate } from "react-router-dom";

const DefaultView = (): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" component="h1" sx={{ m: 4 }}>
                FlexIQ Caclulator
            </Typography>
            <Stack justifyContent="center" direction="column" spacing={2} sx={{ m: 4 }}>
                <Typography variant="body1" >
                    FlexIQ workout calculator is designed to help Personal Trainers and Fitness Coaches create custom workout plans for their clients.
                    <br />This tool not only tracks the progress of each client but will also track the time under tension, ensuring to see where you have improved or need improvement in your workout.
                </Typography>
                <Typography variant="body1" >
                    Each workout can be downloaded as a PDF for your records. You then upload multiple PDFs to generate a monthly graph to see your progress.
                </Typography>
                <Typography variant="body1" >
                    <strong>
                        To get started, select an option below.
                    </strong>
                </Typography>
                <Stack justifyContent="left" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button variant="contained" size="large" onClick={() => navigate('/calculate-workout')}>
                        Calculate Workout
                    </Button>
                    <Button variant="contained" size="large" onClick={() => navigate('/calculate-monthly')}>
                        Calculate Monthly
                    </Button>
                    <LoginButton />
                </Stack>
            </Stack>
        </Container>
    );
};

export default DefaultView;