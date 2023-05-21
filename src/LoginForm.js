import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem(username);
    
        if (storedUser) {
          const userData = JSON.parse(storedUser);
    // console.log("storedUser", userData)
          if (userData.password === password) {
            handleLogin(userData);
          } else {
            console.log('Invalid password');
          }
        } else {
          console.log('User not found');
        }
    
        // Clear form fields
        // setUsername('');
        // setPassword('');
        // window.location.href = '/dashboard';
      };
    
      return (
    <div className="container">
        
        <form onSubmit={handleSubmit}>
          <h2 className='h3up'>Login</h2>
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
        </div>
      );
    };

export default LoginForm;
