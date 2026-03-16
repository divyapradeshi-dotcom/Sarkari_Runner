// src/App.tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom'


import Login from './components/auth/login'   // ← change this path to match your folder
import Register  from './components/auth/Register'
function App() {
  return (
    <Routes>
      {/* ── Your single route ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-2xl mb-6">Page Not Found</p>
            <a 
              href="/login" 
              className="text-blue-600 hover:underline text-xl"
            >
              Go to Login →
            </a>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App