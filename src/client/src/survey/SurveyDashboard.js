import React from "react";
import './../global.css'
import "./SurveyDashboard.css"; // Ensure the correct path

const SurveyDashboard = () => {
    return (
        <div className="survey-dashboard">
            <div className="dashboard-header" style={{ fontSize: "40px", fontWeight: "bold" }}>
                Survey Dashboard
            </div>
            <div className="navigation-buttons">
                <button className="submit-button" onClick={() => window.location.href = '/'}>Home</button>
                <button className="submit-button" onClick={() => window.location.href = '/create-survey'}>Create Survey</button>
                {/* <button onClick={() => window.location.href = '/add-question-type'}>Add question Type</button> */}
                {/* <button onClick={() => window.location.href = '/add-survey-questions'}>Add Survey questions</button> */}
                {/* <button onClick={() => window.location.href = '/delete-question-from-survey'}>Delete Survey Questions</button> */}
                <button className="submit-button" onClick={() => window.location.href = '/display-survey-results'}>Survey Results</button>
                <button className="submit-button" onClick={() => window.location.href = '/add-survey-template'}>Create Survey Template</button>
                <button className="submit-button" onClick={() => window.location.href = '/email-template'}>Email Template</button>
                <button className="submit-button" onClick={() => window.location.href = '/survey-types'}>Survey Types</button>
                
            </div>
            <div className="dashboard-content">
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
};

export default SurveyDashboard;
