import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './HomePage.css'; // Ensure this path is correct
import logo from '../assets/insightpro_logo.png'; // Adjust the path as necessary

function HomePage() {
  const navigate = useNavigate(); // Hook for navigation

  const goToLogin = () => {
    navigate('/login'); // Programmatically navigate to /login route
  };
  const goToCreateUser = () => {
    navigate('/createuser'); // Programmatically navigate to /login route
  };
  const goToCreateRole = () => {
    navigate('/createrole'); // Programmatically navigate to /login route
  };
  const goToAssignUserRole = () => {
    navigate('/assign-user-role'); // Programmatically navigate to /login route
  };

  return (
    <div className="home-page">
      <img src={logo} alt="Insight Pro Logo" className="logo" />
      <h1>Welcome to Insight Pro</h1>
      <p>Your go-to solution for insightful analytics and data visualization.</p>
      {/* Button that when clicked, navigates to the login page */}
      <button onClick={goToLogin} className="login-button">Login</button>
      <button onClick={goToCreateUser} className="login-button">Create User</button>
      <button onClick={goToCreateRole} className="login-button">Create Role</button>
      <button onClick={goToAssignUserRole} className="login-button">Assign User Role</button>
    </div>
  );
}

export default HomePage;
