import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './components/Main.js'
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Main />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
