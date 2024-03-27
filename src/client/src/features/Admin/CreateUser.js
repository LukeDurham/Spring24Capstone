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
      // First, verify the role
      const verifyResponse = await fetch(`/api/verifyRole/${user.role}`);
      const verifyResult = await verifyResponse.json();
  
      if (!verifyResponse.ok || !verifyResult.isRoleValid) {
        alert('Role verification failed or is invalid.');
        return; // Stop the process if role verification fails
      }
  
      // Proceed to create the user if the role is verified
      const createUserResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (createUserResponse.ok) {
        const newUser = await createUserResponse.json();
        alert(`User created successfully: ${newUser.username}`);
        setUser({ username: '', email: '', role: '' }); // Reset form fields
      } else {
        alert('Failed to create user.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing request. Please try again.');
    }
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Define a style object for text color based on mode
  const textColorStyle = {
    color: mode === 'dark' ? '#fff' : '#000',
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <div>
        <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <div className='wrapper' style={textColorStyle}> {/* Apply text color style */}
          <h2 style={textColorStyle}>Create User</h2> {/* Apply text color style to the title */}
          <form onSubmit={handleSubmit}>
            <div className='input-sq-box'>
              {/* Username Input */}
            </div>
            <div className='input-sq-box'>
              {/* Email Input */}
            </div>
            <div className='input-sq-box'>
              <label htmlFor="role" style={textColorStyle}>Role:</label> {/* Apply text color style */}
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
                style={{ color: '#000' }} 
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              
            </div>
            <button type="submit" style={{ color: '#000' }}>Create User</button> {/* Always black text */}
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CreateUser;
