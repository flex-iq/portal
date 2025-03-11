import React, { useState } from "react";
import { Button, TextField, Checkbox, FormControlLabel, Typography, IconButton, Box, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { useWorkouts } from "@/Hooks/WorkoutCalulatorHooks";
import { ClientCreate } from "@/CalculateWorkout/ClientCreate";
import { Set, Exercise } from "@/types";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useNavigate } from "react-router-dom";
import { Styles } from "@/theme/Styles";

export const WorkoutCreate: React.FC = () => {
    const nagivate = useNavigate();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const { nextStep, workouts, mergeExercisesIntoWorkout } = useWorkouts();

    // Calculate total workout TUT dynamically
    const totalWorkoutTut = exercises.reduce((total, exercise) => total + exercise.tut, 0);

    const handleNext = () => {
        mergeExercisesIntoWorkout(workouts[0].id, totalWorkoutTut, exercises);
        nextStep();
    };

    const handleCancel = () => {
        nagivate('/')
        //TODO: Reset the workouts state instead of reloading the page
        window.location.reload();
        // returnHomePage();
    }

    const isExerciseFormValid = () => {
        return exercises[0]?.name && exercises[0]?.sets[0]?.reps && exercises[0]?.sets[0]?.resistance && exercises[0]?.sets[0]?.tempo && exercises[0]?.sets[0]?.rpe;
    };

    const handleSetChangeV3 = (exerciseId: number, setId: number, field: keyof Set, value: number) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map((set) =>
                        set.id === setId
                            ? {
                                ...set,
                                [field]: value, // Update the field (reps, tempo, etc.)
                                tut: (field === "reps" || field === "tempo")
                                    ? (field === "reps" ? value * set?.tempo : set?.reps * value)
                                    : set.tut, // Update TUT when reps/tempo change
                            }
                            : set
                    );

                    // Recalculate Exercise TUT
                    const updatedTut = updatedSets.reduce((sum, s) => sum + s.tut, 0);

                    return { ...exercise, sets: updatedSets, tut: updatedTut };
                }
                return exercise;
            })
        );
    };

    // Add a new set to an exercise
    const addSetV3 = (exerciseId: number) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        sets: [
                            ...exercise.sets,
                            { id: exercise.sets.length + 1, reps: 0, resistance: 0, tempo: 0, rpe: 0, tut: 0 }
                        ]
                    }
                    : exercise
            )
        );
    };

    // Remove a set from an exercise
    const removeSetV3 = (exerciseId: number, setId: number) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.filter((set) => set.id !== setId);
                    const updatedTut = updatedSets.reduce((sum, s) => sum + s.tut, 0);

                    return { ...exercise, sets: updatedSets, tut: updatedTut };
                }
                return exercise;
            })
        );
    };

    const removeExerciseV3 = (exerciseId: number) => {
        setExercises((prevExercises) => {
            // Filter out the exercise to be removed
            const updatedExercises = prevExercises.filter((exercise) => exercise.id !== exerciseId);

            // Recalculate the total workout TUT
            const updatedWorkoutTut = updatedExercises.reduce((total, exercise) => total + exercise.tut, 0);

            // Update the global workout state
            mergeExercisesIntoWorkout(workouts[0]?.id, updatedWorkoutTut, updatedExercises);

            return updatedExercises;
        });
    };

    // // Add a new exercise
    const addExerciseV3 = () => {
        const newExercise: Exercise = {
            id: exercises.length + 1,
            name: "",
            assisted: false,
            tut: 0,
            sets: [{ id: 1, reps: 0, resistance: 0, tempo: 0, rpe: 0, tut: 0 }]
        };
        setExercises((prevExercises) => [...prevExercises, newExercise]);
    };

    return (
        <Box>
            {/* Navigation Buttons  */}
            <NavigationButtons handleCancel={() => handleCancel()} handleNext={() => handleNext()} isFormValid={() => isExerciseFormValid()} />
            {/* Client Create  */}
            <ClientCreate addExercise={() => addExerciseV3()} />
            {/* Workout Create  */}
            {workouts[0]?.id > 0 &&
                <Grid container spacing={2} sx={Styles.Grid.Container}>
                    <Grid>
                        <Button variant="outlined" size="large" onClick={addExerciseV3} >
                            Create Exercise
                        </Button>
                    </Grid>
                </Grid>
            }
            {/* <Divider /> */}
            {exercises[0] &&
                <Box sx={{ height: '500px', overflow: "auto", border: '2px solid #ccc', borderRadius: '8px' }}>
                    {exercises.map((exercise) => (
                        <Box key={exercise.id} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
                            <IconButton aria-label="delete" color="error" onClick={() => removeExerciseV3(exercise.id)}>
                                {/* <CloseIcon fontSize="large" /> */}
                                <DeleteIcon />
                            </IconButton>
                            <TextField
                                label="Exercise Name"
                                value={exercise.name}
                                onChange={(e) =>
                                    setExercises((prevExercises) =>
                                        prevExercises.map((ex) =>
                                            ex.id === exercise.id ? { ...ex, name: e.target.value } : ex
                                        )
                                    )
                                }
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={exercise.assisted}
                                        onChange={(e) =>
                                            setExercises((prevExercises) =>
                                                prevExercises.map((ex) =>
                                                    ex.id === exercise.id ? { ...ex, assisted: e.target.checked } : ex
                                                )
                                            )
                                        }
                                    />
                                }
                                label="Assisted"
                            />
                            <Typography>Exercise TUT: {exercise.tut}</Typography>
                            {exercise.sets.map((set) => (
                                <Grid container key={set.id} spacing={Styles.Grid.Spacing} sx={Styles.Grid.Container}>
                                    <Grid>
                                        <TextField
                                            label="Reps"
                                            type="number"
                                            // value={set.reps}
                                            value={undefined}
                                            onChange={(e) => handleSetChangeV3(exercise.id, set.id, "reps", Number(e.target.value))}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            label="Resistance"
                                            type="number"
                                            value={undefined}
                                            onChange={(e) => handleSetChangeV3(exercise.id, set.id, "resistance", Number(e.target.value))}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            label="Tempo"
                                            type="number"
                                            value={undefined}
                                            onChange={(e) => handleSetChangeV3(exercise.id, set.id, "tempo", Number(e.target.value))}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            label="RPE"
                                            type="number"
                                            value={undefined}
                                            onChange={(e) => handleSetChangeV3(exercise.id, set.id, "rpe", Number(e.target.value))}
                                        />
                                    </Grid>

                                    <Grid>
                                        <Stack direction="row" spacing={Styles.Grid.Spacing} alignItems="center">
                                            <Typography>TUT: {set.tut}</Typography>
                                            <IconButton aria-label="delete" color="error" onClick={() => removeSetV3(exercise.id, set.id)}>
                                                {/* <DeleteIcon /> */}
                                                <CloseIcon fontSize="large" />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button variant="contained" color="primary" onClick={() => addSetV3(exercise.id)}>
                                Add Set
                            </Button>
                        </Box>
                    ))
                    }
                </Box>
            }
            {exercises.length > 0 &&
                <Box sx={{ my: 2 }}>
                    <Typography variant="h6">Total Exercises: {exercises.length}</Typography>
                    <Typography variant="h6">Total Workout TUT: {totalWorkoutTut}</Typography>
                </Box>
            }
        </Box >
    );
};
