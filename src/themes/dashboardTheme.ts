import { Height } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: '4rem',
          display:'flex',
          justifyContent:'center'
        },
      },
    },
    MuiToolbar: {
        styleOverrides: {
          root: {
            height: '4rem',
            minHeight: 'auto !important',
            padding: 0,
          },
        },
    },
    MuiStack: {
        styleOverrides: {
            root: {
              '&:first-of-type': {
                height: '100%',
                '&div':{
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                padding: '20px'
                }
               },
               
            },
          }, 
    },
    MuiDrawer: {
        styleOverrides: {
          paper: {
            height: 'calc(100% - 4rem)',
          },
        },
      },
    }
});

export default theme;
