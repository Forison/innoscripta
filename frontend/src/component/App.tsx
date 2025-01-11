import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Detail = lazy(() => import('./dashboard/Detail'))
const Index = lazy(() => import('./dashboard/Index'))
const LoginForm = lazy(() => import('./authentication/LoginForm'))
const RegistrationForm = lazy(() => import('./authentication/RegistrationForm'))

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={
          <Suspense>
            <LoginForm />
          </Suspense>
        } />
        <Route path='/register' element={
          <Suspense>
            <RegistrationForm />
          </Suspense>
        } />
        <Route path='/newsfeed/:id' element={
          <Suspense>
            <Detail />
          </Suspense>
        } />
        <Route path='/' element={
          <Suspense>
            <Index />
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default App
