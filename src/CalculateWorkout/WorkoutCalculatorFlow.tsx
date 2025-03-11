import React from 'react';
import Box from "@mui/material/Box";

import { useWorkouts } from '@/Hooks/WorkoutCalulatorHooks';
import { GeneratePDF } from '@/CalculateWorkout/GeneratePDF';
import { WorkoutCreate } from '@/CalculateWorkout/WorkoutCreate';

export const WorkoutCalculatorFlow: React.FC = () => {
    const { currentStep } = useWorkouts();

    return (
        <Box>
            {currentStep === 0 && <WorkoutCreate />}
            {currentStep === 1 && <GeneratePDF />}
        </Box>
    );
};

