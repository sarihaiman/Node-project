import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './them.ts'; 
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
         <App />
    </ThemeProvider>
  </React.StrictMode>,
)
