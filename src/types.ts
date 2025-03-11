// Set Type
export type Set = {
    id: number;
    reps: number;
    resistance: number;
    tempo: number;
    rpe: number;
    tut: number;
};

// Exercise Type
export type Exercise = {
    id: number;
    name: string;
    assisted: boolean;
    tut: number;
    sets: Set[];
};

// Workout Type
export type Workout = {
    id: number;
    progression: string;
    generatedName: string;
    firstName: string;
    lastName: string;
    date: string | null;
    split: string;
    type: string;
    bodyWeight: number | undefined;
    tut: number;
    exercises: Exercise[];
};

export type Tut = {
    id: number;
    name: string;
    value: number;
}

// WorkoutCreate Props
export interface WorkoutCreateProps {
    nextStep: () => void;
}

export interface WorkoutHorizontalStepperProps {
    stages: React.ReactNode[];
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    resetStep: () => void;
    returnHomePage: () => void;
}