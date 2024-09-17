import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import SigninFormComponent from './components/signIn.component.tsx';
import SignupFormComponent from './components/signUp.component.tsx';
import OrderFormComponent from './components/ordaer.component.tsx';
import HomeComponent from './components/home.component.tsx';
import ButtonNav from './components/buttonNuv.components.tsx';
import Feedback from './components/feedback.component.tsx';
import ChatbotComponent from './components/ChatBot/chatbot.components.tsx';
import GalleryComponent from './components/gallery.component.tsx';
import ContactComponent from './components/contact.component.tsx';
import ChatComponent from './components/ChatBot/chatbot.components.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { SignIn } from './api/user.api.ts';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <TopNavComponent/>
        <Routes>
          <Route path="/" element={<SigninFormComponent />} />
          <Route path="/signIn" element={<SigninFormComponent />} />
          <Route path="/signUp" element={<SignupFormComponent />} />
          <Route path="/Order" element={<OrderFormComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/gallery" element={<GalleryComponent />} />
        </Routes>
      </Router>
      {/* <ChatbotComponent/> */}
      <Feedback/>
      <ButtonNav />
    </Provider>
  );
}

export default App;
