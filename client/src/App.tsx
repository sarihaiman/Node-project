import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import SigninFormComponent from './components/signIn.component.tsx';
import SignupFormComponent from './components/signUp.component.tsx';
import OrderFormComponent from './components/ordaer.component.tsx';
import ButtonNav from './components/buttonNuv.components.tsx';

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
    <ButtonNav/>
    </Provider>
  );
}
export default App;


// import React from 'react';
// // import ChatBotComponent from './components/ChatBot.component'; // Ensure the path is correct
// import ContactOptions from './components/ContactOption/ContactOption';
// import ChatForm from './components/ContactOption/Chat';

// const App = () => {
  
//   return (
//     <>
//   <ContactOptions></ContactOptions>
//     <ChatForm></ChatForm> 
//     </>
//   );
// };


// export default App;