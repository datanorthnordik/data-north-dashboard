import React, {useEffect} from 'react';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  useEffect(()=>{
    document.body.addEventListener('touchstart', function(e) {
      console.log('touchstart', e);
    }, { passive: true });
    
    document.body.addEventListener('touchmove', function(e) {
      console.log('touchmove', e);
    }, { passive: true });
    
    document.body.addEventListener('touchend', function(e) {
      console.log('touchend', e);
    }, { passive: true });
    
  },[])
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Dashboard/>
    </ThemeProvider> 
  );
}

export default App;
