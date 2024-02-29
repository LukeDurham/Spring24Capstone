import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './common/HomePage';
import Login from './common/Login';
import About from './common/About';
import Survey from './survey/Survey';
import SurveyDashboard from './survey/SurveyDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/surveydashboard" element={<SurveyDashboard />} />
        {/* Include other routes as necessary */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
