import React from "react";
import './Login.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUser, FaLock } from "react-icons/fa"; // Combine imports for cleanliness

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const goToSurveyDashboard = () => {
    navigate('/SurveyDashboard'); // Correct the navigate path
  };
  const goToSurvey = () => {
    navigate('/Survey'); // Correct the navigate path
  };

  return (
    <div className="wrapper">
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon"/>
        </div>    
        <div className="input-box">
          <input type="password" placeholder="Password" required/> {/* Changed type to "password" */}
          <FaLock className="icon"/>
        </div>

        <div className="forgot">
          <label><input type="checkbox"/>Remember Me</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="button" onClick={goToSurveyDashboard}>SurveyDashboard</button> {/* Added type="button" to prevent form submission */}
        <button type="button" onClick={goToSurvey}>Survey</button> {/* Added type="button" to prevent form submission */}
        <div className="register-link">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form> 
    </div>
  );
};

export default LoginPage;
