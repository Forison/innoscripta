import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import SearchField from '../shared/SearchField'
import PreferencesForm from '../shared/PreferencesForm'
import NavigationBar from './NavigationBar'
import { RootState } from '../redux/store'

interface Props {
  children?: React.ReactNode
}

const NewsWrapper: React.FC<Props> = ({ children }) => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-2'>
        <Row className='justify-content-center'>
          <SearchField />
        </Row>
      </Container>
      <Container fluid className='mt-0'>
        <Row className='justify-content-center'>
          <Col md={12} lg={10} className='p-4'>
            <Row>
              <Col xs={12} md={3} className='mt-5 d-none d-md-block'>
                {isLogin && <PreferencesForm />}
              </Col>
              <Col xs={12} md={isLogin ? 9 : 12} className='p-3'>
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
