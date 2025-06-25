import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'

function App() {

  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes path='/'>
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
