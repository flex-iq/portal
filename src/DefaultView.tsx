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
                FlexIQ Workout Caclulator
            </Typography>
            <Stack justifyContent="center" direction="column" spacing={2} sx={{ m: 4 }}>
                <Typography variant="h6" >
                    FlexIQ is designed to help Personal Trainers and Fitness Coaches create custom workout plans for their clients.
                    FlexIQ not only tracks the progress of each client but will also track the time under tension, ensuring to see where you have improved or need improvement in your workout.
                </Typography>
                <Typography variant="h6" >
                    Each workout can be downloaded as a PDF for your records. You then upload the multiple PDFs to generate a monthly graph for you progress.
                </Typography>
                <Typography variant="h6" >
                    To get started, click the Workout option below.
                </Typography>
                <Stack justifyContent="left" direction="row" spacing={2}>
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