import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assuming you have a custom hook to manage authentication state

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();  // Get the authenticated user from context

    if (!user) {
        // If user is not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    return children;  // If authenticated, render the child component (Dashboard)
};

export default PrivateRoute;
