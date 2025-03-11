import React, { lazy } from 'react';

import { useRoutes, RouteObject } from 'react-router-dom';
import { WorkoutCalculatorFlow } from './CalculateWorkout/WorkoutCalculatorFlow';
import { About } from './About';
import { Contact } from './Contact';
import { UserProfile } from './auth/UserProfile';
import { PDFUploader } from './CalculateWorkout/PDFUploader';
import ProtectedRoute from './auth/ProtectedRoute';

const HomePage = lazy(() => import('./DefaultView'));

const Routes: React.FC = () => {
    const routes: Array<RouteObject> = [
        { path: '/', element: <HomePage /> },
        { path: '/about', element: <About /> },
        { path: '/contact', element: <Contact /> },
        { path: '/calculate-workout', element: <ProtectedRoute component={WorkoutCalculatorFlow} /> },
        { path: '/calculate-monthly', element: <ProtectedRoute component={PDFUploader} /> },
        { path: '/profile', element: <ProtectedRoute component={UserProfile} /> }
    ];

    return useRoutes(routes);
}

export default Routes;