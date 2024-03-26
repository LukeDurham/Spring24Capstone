import React from "react";

import Surveys from '../../components/Surveys'; // Corrected import path
import '../../components/Sidebar.css';
import '../../components/Surveys.css';
import SurvAppBar from './SurvAppBar'; // Import the AdminAppBar component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

const SurveyDashboard = () => {
  const [mode, setMode] = React.useState('dark'); // Add this line
  const LPtheme = createTheme(getLPTheme(mode)); // Add this line

  const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <div className="respondent-dashboard">
        <SurvAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <div className="dashboard-content">
        <h1 style={{ color: mode === 'dark' ? '#FFFFFF' : '#333333' }}>Active Surveys</h1>
          <Surveys />
          <h1 style={{ color: mode === 'dark' ? '#FFFFFF' : '#333333' }}>Surveyor Dashboard</h1>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SurveyDashboard;
