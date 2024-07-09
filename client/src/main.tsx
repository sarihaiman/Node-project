import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './them.ts'; 
import TopNavBar from './components/topNav.component'
import SigninForm from './components/signIn.component.tsx'
import SignUpForm from './components/signUp.component.tsx'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
         {/* <App /> */}
         <TopNavBar />
         <SigninForm />
         <SignUpForm/>
    </ThemeProvider>
  </React.StrictMode>,
)
