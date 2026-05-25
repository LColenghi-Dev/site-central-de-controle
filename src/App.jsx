import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home      from './pages/Home/index.jsx'
import Login     from './pages/Login/index.jsx'
import Dashboard from './pages/Dashboard/index.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
