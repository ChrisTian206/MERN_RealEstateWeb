import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './components/nav/Main';
import Register from './pages/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { Toaster } from 'react-hot-toast'
import ActivateAccount from './pages/auth/ActivateAccount';
import AccessAccount from './pages/auth/AccessAccount';
import Dashboard from './pages/user/Dashboard';
import CreateAd from './pages/user/Ad/CreateAd';
import PrivateRoute from './components/routes/PrivateRoute';
import SellHouse from './pages/user/Ad/SellHouse';
import SellLand from './pages/user/Ad/SellLand';
import RentHouse from './pages/user/Ad/RentHouse';
import RentLand from './pages/user/Ad/RentLand';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* moved Main into AuthProvider, bc Main also need auth to log out user  */}
        <Main />
        <Toaster position='bottom-center' />
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
            <Route path='ad/create/sell/house' element={<SellHouse />} />
            <Route path='ad/create/sell/land' element={<SellLand />} />
            <Route path='ad/create/rent/house' element={<RentHouse />} />
            <Route path='ad/create/rent/land' element={<RentLand />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
