import React, { useState } from 'react';
import { Button, Divider, TextField, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Styles } from '@/theme/Styles';
import { useWorkouts } from "@/Hooks/WorkoutCalulatorHooks";
import dayjs from 'dayjs';

interface ClientCreateProps {
    addExercise: () => void;
}

export const ClientCreate: React.FC<ClientCreateProps> = ({ addExercise }) => {
    const { workouts, addWorkout, setAllowNext } = useWorkouts();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [progression, setProgression] = useState("");
    const [workoutDate, setWorkoutDate] = useState<string | null>(null);
    const [split, setSplit] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [bodyWeight, setBodyWeight] = useState<number>(0);

    const generateWorkoutName = (firstName: string, lastName: string, progression: string, split: string, type: string, date: string) => {
        const generatedName = `${split}-${type}-${progression}-${lastName.toUpperCase()}, ${firstName}-${date}`;
        return generatedName;
    };

    const extractDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/ /g, '-'); // this is the dash between the date, month and year
    };

    const handleCreateWorkout = () => {
        addExercise();
        addWorkout({
            firstName: firstName,
            lastName: lastName,
            progression: progression,
            generatedName: generateWorkoutName(firstName, lastName, progression, split, workoutType, extractDate(workoutDate ?? "")),
            date: workoutDate,
            type: workoutType,
            split,
            bodyWeight,
            tut: 0,
            exercises: []
        });
        setAllowNext(true);
    };

    const isWorkoutFormValid = () => {
        return firstName && lastName && progression && split && workoutType && workoutDate;
    };

    return (
        <Box>
            <Typography variant="h3" sx={Styles.Header}>Workout Client Setup</Typography>
            <Grid container spacing={Styles.Grid.Spacing} sx={Styles.Grid.Container}>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="text" label="First Name" value={workouts[0]?.firstName} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField type="text" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    }
                </Grid>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="text" label="Last Name" value={workouts[0]?.lastName} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField type="text" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    }
                </Grid>
            </Grid>
            <Grid container spacing={Styles.Grid.Spacing} sx={Styles.Grid.Container}>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="text" label="Progression" value={progression} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField type="text" label="Progression" value={progression} onChange={(e) => setProgression(e.target.value)} />
                    }
                </Grid>
            </Grid>
            <Grid container spacing={Styles.Grid.Spacing} sx={Styles.Grid.Container}>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="text" label="Split" value={workouts[0].split} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField type="text" label="Split" value={split} onChange={(e) => setSplit(e.target.value)} />
                    }
                </Grid>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="text" label="Type" value={workouts[0].type} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField type="text" label="Type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} />
                    }
                </Grid>
                <Grid>
                    {workouts[0]?.id > 0 ?
                        <TextField type="number" label="kg" value={workouts[0].bodyWeight} slotProps={{ input: { readOnly: true } }} />
                        :
                        <TextField label="kg" value={undefined} onChange={(e) => setBodyWeight(Number(e.target.value))} />
                    }
                </Grid>
            </Grid>
            <Grid container spacing={Styles.Grid.Spacing} sx={Styles.Grid.Container}>
                <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {workouts[0]?.id > 0 ?
                            <DatePicker
                                value={dayjs(workoutDate?.toString() ?? "")}
                                disabled
                            />
                            :
                            <DatePicker
                                disablePast
                                views={['year', 'month', 'day']}
                                onChange={(date) => setWorkoutDate(date?.toString() ?? "")}
                            />
                        }
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container sx={Styles.Grid.Container}>
                {workouts[0]?.id > 0 ?
                    <Grid>
                        <Divider />
                        <Typography variant="h5">{workouts[0]?.generatedName}</Typography>
                        <Divider />
                    </Grid>
                    :
                    <Grid>
                        <Button size="large" variant="contained" onClick={() => handleCreateWorkout()} disabled={!isWorkoutFormValid()} >
                            Create
                        </Button>
                    </Grid>
                }
            </Grid>
        </Box >
    )
}