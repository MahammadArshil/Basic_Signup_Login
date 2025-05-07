import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoutes><Home /></PrivateRoutes>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
