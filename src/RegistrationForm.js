import React, { useState } from 'react';
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
    localStorage.setItem(username, JSON.stringify(userData));
    handleRegister(userData);
    setUserType('');
    setUsername('');
    setPassword('');
    window.location.href = '/login';
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
    <h2>Registration</h2>
    <div >
      <label>User Type:</label>
      <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
        <option value="">Select User Type</option>
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
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
  </div>
);
};

export default RegistrationForm;
