import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './components/Main.js'
import Register from './pages/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { Toaster } from 'react-hot-toast'
import ActivateAccount from './pages/auth/ActivateAccount';
import AccessAccount from './pages/auth/AccessAccount';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* moved Main into AuthProvider, bc Main also need auth to log out user  */}
        <Main />
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='/auth/account-activate/:token' element={<ActivateAccount />} />
          <Route path='/auth/access-account/:token' element={<AccessAccount />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
