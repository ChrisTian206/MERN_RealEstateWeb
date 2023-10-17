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
import Dashboard from './pages/user/Dashboard';
import CreateAd from './pages/user/Ad/CreateAd';
import PrivateRoute from './components/routes/PrivateRoute';

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

          <Route path='/' element={<PrivateRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='ad/create' element={<CreateAd />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
