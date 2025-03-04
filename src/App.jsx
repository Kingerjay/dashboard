import { useState } from 'react'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      
      <Route path="/" element={<Dashboard/>} /> 
      

    </Routes>
  )
}

export default App
