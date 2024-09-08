import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './them.ts'; 
import TopNavBar from './components/topNav.component'
import SigninForm from './components/signIn.component.tsx'
import SignUpForm from './components/signUp.component.tsx'; 
import FileUpload from './components/upload.component.tsx'; 
import AddOrderFormComponent from './components/ordaer.component.tsx'; 
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
         <App />
         {/* <TopNavBar />
         <SigninForm />
         <SignUpForm/>
         <FileUpload/>
         <AddOrderFormComponent/> */}
    </ThemeProvider>
  </React.StrictMode>,
)
