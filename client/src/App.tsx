import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import SigninFormComponent from './components/signIn.component.tsx';
import SignupFormComponent from './components/signUp.component.tsx';
import OrderFormComponent from './components/ordaer.component.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<TopNavComponent/>} />
        <Route path="/signIn" element={<SigninFormComponent />} />
        <Route path="/signUp" element={<SignupFormComponent />}/>
        <Route path="/Order" element={<OrderFormComponent />} />
      </Routes>
    </Router>
    </Provider>
  );
}
export default App;


