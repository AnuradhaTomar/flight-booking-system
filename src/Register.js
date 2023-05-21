import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

const RegistrationForm = ({ handleRegister }) => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      userType,
      username,
      password
    };

    // Store user registration data in local storage
    localStorage.setItem(username, JSON.stringify(userData));

    handleRegister(userData);

    // Clear form fields
    setUserType('');
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div>
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Select User Type</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      if (userData.password === password) {
        handleLogin(userData);
      } else {
        console.log('Invalid password');
      }
    } else {
      console.log('User not found');
    }

    // Clear form fields
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch the bookings from the server or local storage and update the state

  return (
    <div>
      <h2>User Dashboard</h2>
      {/* Display user dashboard content */}
    </div>
  );
};

const AdminDashboard = () => {
  const [bookingCount, setBookingCount] = useState(0);

  // Fetch the booking count from the server or local storage and update the state

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Display admin dashboard content */}
    </div>
  );
};

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleRegister = (userData) => {
    setIsLoggedIn(true);
    setUserType(userData.userType);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserType(userData.userType);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  return (
    <Router>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
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
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            userType === 'customer' ? (
              <UserDashboard />
            ) : userType === 'admin' ? (
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

export default Register;
