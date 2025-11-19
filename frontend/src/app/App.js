import '../App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from '../routes/appRoutes';
import GlobalToast from '../components/globalToast';
import PasswordInput from '../components/passwordInput';

function App() {
  return (
    <Router>
      <AppRoutes/>
      <GlobalToast/>
      <PasswordInput/>
    </Router>
  );
}

export default App;
