import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps<P = {}> {
    component: React.ComponentType<P>;
    rest?: P;
}

const ProtectedRoute = <P extends object>({ component: Component, ...rest }: ProtectedRouteProps<P>) => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Component {...rest as P} /> : <Navigate to="/" />;
};

export default ProtectedRoute;