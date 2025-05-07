import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './components/Chat/Chat';


function App() {
  useEffect(() => {
    document.body.addEventListener('touchstart', function (e) {
      console.log('touchstart', e);
    }, { passive: true });

    document.body.addEventListener('touchmove', function (e) {
      console.log('touchmove', e);
    }, { passive: true });

    document.body.addEventListener('touchend', function (e) {
      console.log('touchend', e);
    }, { passive: true });

  }, [])
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat/>} />
          <Route path="" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
