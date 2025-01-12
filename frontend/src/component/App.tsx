import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { RootState } from './redux/store'
import Loading from './shared/Loading'

const FilteredNews = lazy(() => import('./dashboard/FilteredNews'))
const Detail = lazy(() => import('./dashboard/Detail'))
const NewsFeed = lazy(() => import('./dashboard/NewsFeed'))
const LoginForm = lazy(() => import('./authentication/LoginForm'))
const RegistrationForm = lazy(() => import('./authentication/RegistrationForm'))

const App: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" replace /> : <LoginForm />}
          />
          <Route
            path="/register"
            element={isLogin ? <Navigate to="/" replace /> : <RegistrationForm />}
          />
          <Route path="/newsfeed/:id" element={<Detail />} />
          <Route path="/" element={<NewsFeed />} />
          {/* <Route path="newsfeed/" element={<FilteredNews />} /> */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
