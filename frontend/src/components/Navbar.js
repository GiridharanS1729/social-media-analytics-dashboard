import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const [showProfile, setShowProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const user = {
        name: "Giridharan S",
        email: "giridharans1729@gmail.com"
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        alert("Logged out");
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <NavLink to="/dashboard" className="nav-link" activeClassName="active" exact>
                    Home
                </NavLink>
                <NavLink to="/youtube" className="nav-link" activeClassName="active">
                    YouTube
                </NavLink>
                <NavLink to="/twitter" className="nav-link" activeClassName="active">
                    Twitter
                </NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">
                    About
                </NavLink>
            </div>

            {isLoggedIn ? (
                <div className="profile-section">
                    <div className="profile-icon" onClick={toggleProfile}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    {showProfile && (
                        <div className="profile-card">
                            <p><strong>{user.name}</strong></p>
                            <p>{user.email}</p>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <NavLink to="/login" className="nav-link" activeClassName="active">
                    Login
                </NavLink>
            )}
        </nav>
    );
}

export default Navbar;
