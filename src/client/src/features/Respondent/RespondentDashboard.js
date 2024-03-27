import React,{ useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

import Surveys from '../../components/Surveys'; // Corrected import path
import RespondAppBar from "./RespondAppBar";
import '../../components/Surveys.css';

const RespondentDashboard = () => {  
  
  const [mode, setMode] = useState('dark'); // Add this line
  const LPtheme = createTheme(getLPTheme(mode)); // Add this line

const toggleColorMode = () => {
  setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
};


  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
        <div>
        <RespondAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <div className="respondent-dashboard">
      
          <div className="dashboard-content">
            <Surveys />
            <h1>Respondent Dashboard</h1>
          </div>
          </div>
          
        </div>
    </ThemeProvider>
  );
}

export default RespondentDashboard;