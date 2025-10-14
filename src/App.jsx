import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/client/forgetPassword'

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_Google_OAuth_Client_Id}>
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes path='/'>
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
