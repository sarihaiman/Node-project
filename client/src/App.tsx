import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import TopNavComponent from './components/topNav.component.tsx';
import ChatbotComponent from './components/ChatBot/chatbot.components.tsx';
import ButtonNav from './components/buttonNuv.components.tsx';
import Feedback from './components/feedback.component.tsx';
import Routes from './components/routers.component.tsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopNavComponent />
        <Routes />
      </Router>
      <ChatbotComponent />
      <Feedback />
      <ButtonNav />
    </Provider>
  );
}

export default App;
