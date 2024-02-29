import React from "react";
import "./SurveyDashboard.css"; // Ensure the correct path

const SurveyDashboard = () => {
    return (
        <div className="survey-dashboard">
            <div className="dashboard-header" style={{ fontSize: "40px", fontWeight: "bold" }}>
                Survey Dashboard
            </div>
            <div className="navigation-buttons">
                <button onClick={() => window.location.href = '/'}>Home</button>
                <button onClick={() => window.location.href = '/surveys'}>Surveys</button>
                <button onClick={() => window.location.href = '/results'}>Results</button>
            </div>
            <div className="dashboard-content">
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
};

export default SurveyDashboard;
