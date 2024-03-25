import React, { useState, useEffect } from 'react';
import '../../global.css';
import AdminAppBar from '../../components/AdminAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../../getLPTheme';

function CreateUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [roles, setRoles] = useState([]); // State to store roles
  const [mode, setMode] = useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));

  useEffect(() => {
    // Fetch roles when the component mounts
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (response.ok) {
          const data = await response.json();
          setRoles(data.roles); // Assuming the response is an object with a roles array
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

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
        setUser({ username: '', email: '', role: '' }); // Reset form fields
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
              {/* Username Input */}
            </div>
            <div className='input-sq-box'>
              {/* Email Input */}
            </div>
            <div className='input-sq-box'>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CreateUser;
