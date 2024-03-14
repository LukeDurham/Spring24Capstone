import React from 'react';

function Surveys() {
  const surveys = [
    { id: 1, name: 'Customer Satisfaction', responses: 150 },
    { id: 2, name: 'Product Feedback', responses: 89 },
    // Add more surveys as needed
  ];

  return (
    <div className="surveys">
      <h2>Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>
            {survey.name} - {survey.responses} responses
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Surveys;