import React from 'react';
import PropTypes from 'prop-types';
import './Surveys.css'; // Ensure this file is linked correctly for styles

function Surveys({ mode }) {
  const surveys = [
    { id: 1, name: 'Customer Satisfaction', responses: 150, totalRespondents: 200 },
    { id: 2, name: 'Product Feedback', responses: 89, totalRespondents: 120 },
    { id: 3, name: 'Website Usability', responses: 102, totalRespondents: 150 },
    { id: 4, name: 'Service Quality', responses: 134, totalRespondents: 180 },
  ];

  const activeSurveysStyle = {
    color: mode === 'dark' ? '#FFFFFF' : '#000000', // Set to white in dark mode, black in light mode
  };

  return (
    <div className="surveys">
      
      <div className="surveys-grid">
        {surveys.map((survey) => (
          <div key={survey.id} className="survey-box">
            <h3 style={{ color: '#000000' }}>{survey.name}</h3> {/* Set to black */}
            <p>ID: {survey.id}</p>
            <p>Responses: {survey.responses}</p>
            <p>Total Respondents: {survey.totalRespondents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Surveys.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default Surveys;
