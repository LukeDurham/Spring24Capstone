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
                <button onClick={() => window.location.href = '/create-survey'}>Create Survey</button>
                <button onClick={() => window.location.href = '/add-survey-questions'}>Add Survey questions</button>
                <button onClick={() => window.location.href = '/delete-question-from-survey'}>Delete Survey Questions</button>
                <button onClick={() => window.location.href = '/display-survey-results'}>Survey Results</button>
                <button onClick={() => window.location.href = '/email-template'}>Email Template</button>
                <button onClick={() => window.location.href = '/survey-types'}>Change Survey Types</button>
                
            </div>
            <div className="dashboard-content">
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
};

export default SurveyDashboard;