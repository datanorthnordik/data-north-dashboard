import React from 'react';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Dashboard/>
    </ThemeProvider> 
  );
}

export default App;
