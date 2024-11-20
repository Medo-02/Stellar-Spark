import './App.css'
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './UserContext'
import { useContext } from 'react';
import axios from 'axios';
import Navbar from './components/navbar'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import AccountUpcomingPage from './pages/AccountUpcomingPage'
import AccountHostingPage from './pages/AccountHostingPage'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {

  return (
    <div className='min-h-screen'>
      <UserContextProvider>
        <Navbar />
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/account/upcoming' element={<AccountUpcomingPage />} />
            <Route path='/account/hosting' element={<AccountHostingPage />} />
          </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
