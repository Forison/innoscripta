import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './authentication/LoginForm'
import RegistrationForm from './authentication/RegistrationForm'
import Index from './dashboard/Index'
import Detail from './dashboard/Detail'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/newsfeed/:id' element={<Detail />} />
        <Route path='/' element={<Index />} />
      </Routes>
    </Router>
  )
}

export default App
