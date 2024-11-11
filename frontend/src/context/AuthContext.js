import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (for example, via JWT in localStorage or session)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);  // Set the user from localStorage
        }
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));  // Store the user info in localStorage
        navigate('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');  // Remove user info from localStorage
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
