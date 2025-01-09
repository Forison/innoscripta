import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const user = {
  name: 'John Doe',
  profileImage: 'https://via.placeholder.com/50',
}

const NavigationBar: React.FC = () => {
  return (
    <Navbar expand='lg' bg='light' variant='light' sticky='top' className='shadow-sm'>
      <Container className='d-flex justify-content-between align-items-center'>
        <Navbar.Brand as={Link} to='/' className='fw-bold'>NewsFeed</Navbar.Brand>
        <div className='d-flex align-items-center'>
          <NavDropdown
            title={user.name}
            id='user-dropdown'
            align='end'
          >
            <NavDropdown.Item as={Link} to='/login' className='small'>Login</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/register' className='small'>Register</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/login' className='small'>Upload</NavDropdown.Item>
            <hr />
            <NavDropdown.Item as={Link} to='/logout' className='small'>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
