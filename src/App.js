import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import "./FlightBooking.css"


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');

    const handleRegister = (userData) => {
        // Handle registration logic here
        setIsLoggedIn(true);
        setUserType(userData.userType);
    };

    const handleLogin = (userData) => {
        // Handle login logic here
        setIsLoggedIn(true);
        setUserType(userData.userType);
        console.log(userData.userType);
        console.log(userType);

        // window.location.href = '/dashboard';

    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType('');
    };

    return (
        <Router>
            <div className='container'>
                    <nav>
                        <ul>
                            <li>
                <div className='booking-section '>
                                <Link to="/register">Registration</Link>
                </div>
                            
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            {isLoggedIn && (
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                <Routes>
                    <Route
                        path="/register"
                        element={isLoggedIn ? <Navigate to="/login" /> : <RegistrationForm handleRegister={handleRegister} />}
                    />
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm handleLogin={handleLogin} />}
                    /> <Route
                        path="/dashboard"
                        element={
                            isLoggedIn ? (
                                userType == 'Customer' ? (
                                    <UserDashboard />
                                ) : userType == 'Admin' ? (
                                    <AdminDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/" element={<Navigate to="/register" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
