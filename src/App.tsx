import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AppPage from './pages/AppPage'
import { RequireAuth } from './auth/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/app" element={<RequireAuth><AppPage /></RequireAuth>} />
    </Routes>
  )
}

export default App
