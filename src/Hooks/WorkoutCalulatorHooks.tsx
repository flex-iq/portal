import React, { createContext, useContext, useState, ReactNode } from "react";
import { Exercise, Set, Workout } from "../types";

interface WorkoutsContextType {
    nextStep: () => void;
    prevStep: () => void;
    currentStep: number;
    workouts: Workout[];
    setWorkouts?: React.Dispatch<React.SetStateAction<Workout[]>>;
    addWorkout: (workout: Omit<Workout, "id">) => void;
    addExercise: (workoutId: number, exercise: Omit<Exercise, "id">) => void;
    addSet: (workoutId: number, exerciseId: number, set: Omit<Set, "id">) => void;
    removeSet: (workoutId: number, exerciseId: number, setId: number) => void;
    allowNext: boolean;
    setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
    mergeExercisesIntoWorkout: (workoutId: number, totalTUT: number, exercises: Exercise[]) => void;
    handleSetChangeV3: (exerciseId: number, setId: number, field: keyof Set, value: number) => void;
    addSetV3: (exerciseId: number) => void;
    removeSetV3: (exerciseId: number, setId: number) => void;
    addExerciseV3: () => void;
}

const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

export const WorkoutsProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [allowNext, setAllowNext] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const stages = ['Step 1', 'Step 2'];

    const addWorkout = (workout: Omit<Workout, "id">) => {
        setWorkouts((prev) => [...prev, { id: prev.length + 1, ...workout }]);
    };

    const resetWorkouts = () => {
        return setWorkouts([]);
    }

    const nextStep = () => {
        if (currentStep < stages.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Add an exercise to a specific workout
    const addExercise = (workoutId: number, exercise: Omit<Exercise, "id">) => {
        setWorkouts((prev) =>
            prev.map((workout) =>
                workout.id === workoutId
                    ? {
                        ...workout,
                        exercises: [
                            ...workout.exercises,
                            { id: workout.exercises.length + 1, ...exercise },
                        ],
                    }
                    : workout
            )
        );
    };

    const addSet = (workoutId: number, exerciseId: number, set: Omit<Set, "id">) => {
        setWorkouts((prev) =>
            prev.map((workout) =>
                workout.id === workoutId
                    ? {
                        ...workout,
                        exercises: workout.exercises.map((exercise) =>
                            exercise.id === exerciseId
                                ? {
                                    ...exercise,
                                    sets: [...exercise.sets, { id: exercise.sets.length + 1, ...set }],
                                    tut: [...exercise.sets, { id: exercise.sets.length + 1, ...set }]
                                        .reduce((sum, s) => sum + s.tut, 0), // Update Exercise tut
                                }
                                : exercise
                        ),
                        tut: workout.exercises.reduce(
                            (totalTut, exercise) =>
                                totalTut +
                                (exercise.id === exerciseId
                                    ? [...exercise.sets, { id: exercise.sets.length + 1, ...set }]
                                        .reduce((sum, s) => sum + s.tut, 0)
                                    : exercise.tut),
                            0
                        ), // Update Workout tut by summing all exercises
                    }
                    : workout
            )
        );
    };

    const mergeExercisesIntoWorkout = (workoutId: number, totalTut: number, exercises: Exercise[]) => {
        setWorkouts((prev) =>
            prev.map((workout) =>
                workout.id === workoutId
                    ? {
                        ...workout,
                        exercises, // Merge the new exercises into the workout
                        tut: totalTut, // Update the total TUT
                    }
                    : workout
            )
        );
    };


    const removeSet = (workoutId: number, exerciseId: number, setId: number) => {
        setWorkouts((prev) =>
            prev.map((workout) => {
                if (workout.id === workoutId) {
                    const updatedExercises = workout.exercises.map((exercise) => {
                        if (exercise.id === exerciseId) {
                            const updatedSets = exercise.sets.filter((set) => set.id !== setId);
                            const updatedTut = updatedSets.reduce((sum, s) => sum + s.tut, 0);

                            return {
                                ...exercise,
                                sets: updatedSets,
                                tut: updatedTut, // Update Exercise tut
                            };
                        }
                        return exercise;
                    });

                    // Get all exercises with tut > 0
                    const nonZeroExercises = updatedExercises.filter((exercise) => exercise.tut > 0);
                    const nonZeroTutValues = nonZeroExercises.map((exercise) => exercise.tut);

                    let updatedWorkoutTut;
                    if (nonZeroExercises.length === 0) {
                        updatedWorkoutTut = 0; // If all exercises are 0, set Workout tut to 0
                    } else if (nonZeroExercises.length === 1) {
                        updatedWorkoutTut = nonZeroExercises[0].tut; // If one exercise remains, set Workout tut to that value
                    } else {
                        updatedWorkoutTut = nonZeroTutValues.reduce((sum, tut) => sum + tut, 0); // Sum all non-zero exercises
                    }

                    return {
                        ...workout,
                        exercises: updatedExercises,
                        tut: updatedWorkoutTut, // Update Workout tut
                    };
                }
                return workout;
            })
        );
    };

    // *********************************************************************
    // version3 functions
    // *********************************************************************

    // const handleSetChangeV3 = (exerciseId: number, setId: number, field: keyof Set, value: number) => {
    //     setExercises((prevExercises) =>
    //         prevExercises.map((exercise) => {
    //             if (exercise.id === exerciseId) {
    //                 const updatedSets = exercise.sets.map((set) =>
    //                     set.id === setId
    //                         ? {
    //                             ...set,
    //                             [field]: value, // Update the field (reps, tempo, etc.)
    //                             tut: (field === "reps" || field === "tempo")
    //                                 ? (field === "reps" ? value * set?.tempo : set?.reps * value)
    //                                 : set.tut, // Update TUT when reps/tempo change
    //                         }
    //                         : set
    //                 );

    //                 // Recalculate Exercise TUT
    //                 const updatedTut = updatedSets.reduce((sum, s) => sum + s.tut, 0);

    //                 return { ...exercise, sets: updatedSets, tut: updatedTut };
    //             }
    //             return exercise;
    //         })
    //     );
    // };


    const handleSetChangeV3 = (exerciseId: number, setId: number, field: keyof Set, value: number) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map((set) => {
                        if (set.id === setId) {
                            let updatedTut;
                            if (field === "reps" || field === "tempo") {
                                const tempo = set?.tempo || 0;
                                const reps = set?.reps || 0;
                                updatedTut = field === "reps" ? value * tempo : reps * value;
                            } else {
                                updatedTut = set.tut;
                            }

                            return {
                                ...set,
                                [field]: value,
                                tut: updatedTut,
                            };
                        }
                        return set;
                    });

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

    // Add a new exercise
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
        <WorkoutsContext.Provider value={React.useMemo(() => ({
            resetWorkouts,
            nextStep,
            prevStep,
            currentStep,
            workouts,
            setWorkouts,
            addWorkout,
            addExercise,
            addSet,
            removeSet,
            allowNext,
            setAllowNext,
            mergeExercisesIntoWorkout,
            handleSetChangeV3,
            addSetV3,
            removeSetV3,
            addExerciseV3
        }), [workouts])}>
            {children}
        </WorkoutsContext.Provider>
    );
};


export const useWorkouts = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw new Error("useWorkouts must be used within a WorkoutsProvider");
    }
    return context;
};































// export const useWorkouts = () => {
//     const [workouts, setWorkouts] = useState<Workout[]>([]);

//     // Add a new workout
//     const addWorkout = (workout: Omit<Workout, "id">) => {
//         setWorkouts((prev) => [...prev, { id: prev.length + 1, ...workout }]);
//     };

//     // Add an exercise to a specific workout
//     const addExercise = (workoutId: number, exercise: Omit<Exercise, "id">) => {
//         setWorkouts((prev) =>
//             prev.map((workout) =>
//                 workout.id === workoutId
//                     ? {
//                         ...workout,
//                         exercises: [
//                             ...workout.exercises,
//                             { id: workout.exercises.length + 1, ...exercise },
//                         ],
//                     }
//                     : workout
//             )
//         );
//     };

//     // // Add a set to a specific exercise in a workout
//     // const addSet = (workoutId: number, exerciseId: number, set: Omit<Set, "id">) => {
//     //     setWorkouts((prev) =>
//     //         prev.map((workout) =>
//     //             workout.id === workoutId
//     //                 ? {
//     //                     ...workout,
//     //                     exercises: workout.exercises.map((exercise) =>
//     //                         exercise.id === exerciseId
//     //                             ? {
//     //                                 ...exercise,
//     //                                 sets: [...exercise.sets, { id: exercise.sets.length + 1, ...set }],
//     //                             }
//     //                             : exercise
//     //                     ),
//     //                 }
//     //                 : workout
//     //         )
//     //     );
//     // };

//     // AMAZING
//     // const addSet = (workoutId: number, exerciseId: number, set: Omit<Set, "id">) => {
//     //     setWorkouts((prev) =>
//     //         prev.map((workout) =>
//     //             workout.id === workoutId
//     //                 ? {
//     //                     ...workout,
//     //                     exercises: workout.exercises.map((exercise) =>
//     //                         exercise.id === exerciseId
//     //                             ? {
//     //                                 ...exercise,
//     //                                 sets: [...exercise.sets, { id: exercise.sets.length + 1, ...set }],
//     //                                 tut: [...exercise.sets, { id: exercise.sets.length + 1, ...set }]
//     //                                     .reduce((sum, s) => sum + s.tut, 0), // Update total TUT
//     //                             }
//     //                             : exercise
//     //                     ),
//     //                 }
//     //                 : workout
//     //         )
//     //     );
//     // };

//     const addSet = (workoutId: number, exerciseId: number, set: Omit<Set, "id">) => {
//         setWorkouts((prev) =>
//             prev.map((workout) =>
//                 workout.id === workoutId
//                     ? {
//                         ...workout,
//                         exercises: workout.exercises.map((exercise) =>
//                             exercise.id === exerciseId
//                                 ? {
//                                     ...exercise,
//                                     sets: [...exercise.sets, { id: exercise.sets.length + 1, ...set }],
//                                     tut: [...exercise.sets, { id: exercise.sets.length + 1, ...set }]
//                                         .reduce((sum, s) => sum + s.tut, 0), // Update Exercise tut
//                                 }
//                                 : exercise
//                         ),
//                         tut: workout.exercises.reduce(
//                             (totalTut, exercise) =>
//                                 totalTut +
//                                 (exercise.id === exerciseId
//                                     ? [...exercise.sets, { id: exercise.sets.length + 1, ...set }]
//                                         .reduce((sum, s) => sum + s.tut, 0)
//                                     : exercise.tut),
//                             0
//                         ), // Update Workout tut by summing all exercises
//                     }
//                     : workout
//             )
//         );
//     };

//     // remove a set from a specific exercise in a workout
//     const removeSet = (workoutId: number, exerciseId: number, setId: number) => {
//         setWorkouts((prev) =>
//             prev.map((workout) =>
//                 workout.id === workoutId
//                     ? {
//                         ...workout,
//                         exercises: workout.exercises.map((exercise) =>
//                             exercise.id === exerciseId
//                                 ? {
//                                     ...exercise,
//                                     sets: exercise.sets.filter((set) => set.id !== setId),
//                                 }
//                                 : exercise
//                         ),
//                     }
//                     : workout
//             )
//         );
//     };

//     // const updateExerciseTut = (workoutId: number, setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>) => {
//     //     setWorkouts((prevWorkouts) =>
//     //         prevWorkouts.map((workout) => {
//     //             if (workout.id === workoutId) {
//     //                 return {
//     //                     ...workout,
//     //                     exercises: workout.exercises.map((exercise) => {
//     //                         const totalTUT = exercise.sets.reduce((sum, set) => sum + set.tut, 0);
//     //                         return { ...exercise, totalTUT };
//     //                     }),
//     //                 };
//     //             }
//     //             return workout;
//     //         })
//     //     );
//     // };

//     // const updateExerciseTotalTut = (workout: Workout): Workout => {
//     //     return {
//     //         ...workout,
//     //         exercises: workout?.exercises?.map((exercise) => {
//     //             // Sum up the `tut` field from all sets
//     //             const tut = exercise?.sets?.reduce((sum, set) => sum + set.tut, 0);
//     //             console.log("updateExerciseTotalTut", { ...exercise, tut: tut });
//     //             // console.log("updateExerciseTotalTut", { ...exercise, totalTUT });
//     //             // Return the updated exercise with `totalTUT`
//     //             return { ...exercise, tut: tut };
//     //         }),
//     //     };
//     // };

//     const updateExerciseTotalTut = (workout: Workout): Workout => {
//         return {
//             ...workout,
//             exercises: workout?.exercises?.map((exercise) => {
//                 // Sum up the `tut` field from all sets
//                 const tut = exercise?.sets?.reduce((sum, set) => sum + set.tut, 0);
//                 console.log("updateExerciseTotalTut", { ...exercise, tut: tut });
//                 // console.log("updateExerciseTotalTut", { ...exercise, totalTUT });
//                 // Return the updated exercise with `totalTUT`
//                 return { ...exercise, tut: tut };
//             }),
//         };
//     };

//     // const updateExerciseTotals = (workoutId: number, setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>) => {
//     //     setWorkouts((prevWorkouts) =>
//     //         prevWorkouts.map((workout) => {
//     //             if (workout.id === workoutId) {
//     //                 return {
//     //                     ...workout,
//     //                     exercises: workout.exercises.map((exercise) => {
//     //                         const totalTUT = exercise.sets.reduce((sum, set) => sum + set.tut, 0);
//     //                         return { ...exercise, totalTUT };
//     //                     }),
//     //                 };
//     //             }
//     //             return workout;
//     //         })
//     //     );
//     // };

//     return { workouts, setWorkouts, addWorkout, addExercise, addSet, removeSet, updateExerciseTotalTut };
// };
