import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './components/Main.js'
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast'
import ActivateAccount from './pages/auth/ActivateAccount';
function App() {
  return (
    <BrowserRouter>
      <Main />
      <Toaster />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/auth/account-activate/:token' element={<ActivateAccount />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
