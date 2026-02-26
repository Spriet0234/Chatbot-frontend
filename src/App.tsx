import './App.css'
import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignupPage'
import AppPage from './pages/AppPage'
import { RequireAuth } from './auth/RequireAuth'

//routing logic only

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/app" element={<RequireAuth><AppPage/></RequireAuth>}/>
      <Route path="/" element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
