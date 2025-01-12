import React, { useCallback, useEffect, useState } from 'react'
import { Navbar, NavDropdown, Container, ButtonGroup, Button, Breadcrumb } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FiAlignJustify } from 'react-icons/fi'
import PreferenceForm from '../shared/PreferencesForm'
import { setUserRole, setAuthStatus } from '../redux/userSlice'
import { fetchUserData } from '../../helper/userProfileApiHandler'

const NavigationBar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [showPreferences, setShowPreferences] = useState(false) // State to toggle PreferencesForm
  const handleLogin = () => navigate('/login')
  const handleRegister = () => navigate('/register')

  useEffect(() => {
    fetchUserData('GET', 'http://localhost:8000/api/v1/profile')
      .then(data => {
        setName(data.name)
        dispatch(setUserRole(data.role === 'admin'))
        dispatch(setAuthStatus(true))
      })
      .catch(error => {
        console.error('Error fetching profile:', error)
      })
  }, [dispatch])

  const handleLogout = () => {
    dispatch(setUserRole(false))
    fetchUserData('POST', 'http://localhost:8000/api/v1/logout')
      .then(() => {
        dispatch(setAuthStatus(false))
        navigate('/login')
      })
      .catch(error => {
        console.error('Error logging out:', error)
      })
  }

  const togglePreferences = useCallback(() => {
    setShowPreferences(prevState => !prevState)
  }, [])

  return (
    <Navbar expand='lg' bg='light' variant='light' sticky='top' className='shadow-sm'>
      <Container className='d-flex justify-content-between align-items-center'>
        <Navbar.Brand as={Link} to='/' className='fw-bold'>
          NewsFeed
        </Navbar.Brand>
        <div className='d-flex align-items-center'>
          {name ?
            <NavDropdown
              title={name}
              id='user-dropdown'
              align='end'
            >
              <NavDropdown.Item onClick={handleLogout} className='small'>Logout</NavDropdown.Item>
            </NavDropdown>
            :
            <ButtonGroup>
              <Button variant='primary' onClick={handleLogin} className='small'>
                Log In
              </Button>
              <Button variant='info' onClick={handleRegister} className='small'>
                Register
              </Button>
            </ButtonGroup>
          }
          <div className='d-lg-none'>
            <Breadcrumb>
              <Breadcrumb.Item onClick={togglePreferences} className='cursor-pointer'>
                <FiAlignJustify />
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {showPreferences && <PreferenceForm />}
    </Navbar>
  )
}

export default NavigationBar
