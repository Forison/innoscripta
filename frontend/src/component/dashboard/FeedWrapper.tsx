import React, { Children } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SearchField from '../shared/SearchField'
import PreferencesForm from '../shared/PreferencesForm'
import NavigationBar from './NavigationBar'

interface HomeProps {
  children?: React.ReactNode
}

const NewsWrapper: React.FC<HomeProps> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-2'>
        <Row className='justify-content-center'>
          <SearchField />
        </Row>
      </Container>
      <Container fluid className='mt-2'>
        <Row className='justify-content-center'>
          <Col md={12} lg={10} className='p-4'>
            <Row>
              <Col xs={12} md={3} className='mt-5'>
                <PreferencesForm />
              </Col>
              <Col xs={12} md={9} className='p-3'>
                {children}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewsWrapper
