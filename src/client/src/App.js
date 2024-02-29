import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './common/HomePage';
import Login from './common/Login';
import About from './common/About';
import Survey from './survey/Survey';
import SurveyDashboard from './survey/SurveyDashboard';
// Importing new components
import AddSurveyQuestions from './survey/alterSurveys/AddSurveyQuestions';
import CreateSurvey from './survey/alterSurveys/CreateSurvey';
import DeleteQuestionFromSurvey from './survey/alterSurveys/DeleteQuestionFromSurvey';
import DisplaySurveyResults from './survey/alterSurveys/DisplaySurveyResults';
import EmailTemplate from './survey/alterSurveys/EmailTemplate';
import SurveyTypes from './survey/alterSurveys/SurveyTypes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/surveydashboard" element={<SurveyDashboard />} />
        {/* Adding new routes for the alterSurveys directory */}
        <Route path="/add-survey-questions" element={<AddSurveyQuestions />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/delete-question-from-survey" element={<DeleteQuestionFromSurvey />} />
        <Route path="/display-survey-results" element={<DisplaySurveyResults />} />
        <Route path="/email-template" element={<EmailTemplate />} />
        <Route path="/survey-types" element={<SurveyTypes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
