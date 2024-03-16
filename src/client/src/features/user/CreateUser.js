import React, { useState } from 'react';
import '../../global.css';
import AdminAppBar from '../../components/AdminAppBar'; // Import the AdminAppBar component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

function CreateUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const [mode, setMode] = useState('dark'); // Add this line
  const LPtheme = createTheme(getLPTheme(mode)); // Add this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const newUser = await response.json();
        alert(`User created successfully: ${newUser.username}`);
        setUser({ username: '', email: '' }); // Reset username and email
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <div>
        <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <div className='wrapper'>
          <h2>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-sq-box'>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-sq-box'> 
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CreateUser;
