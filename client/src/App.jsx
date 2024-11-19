import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
function App() {

  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
