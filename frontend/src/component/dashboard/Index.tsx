import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SearchField from '../shared/SearchField'
import PreferencesForm from '../shared/PreferencesForm'
import NavigationBar from './NavigationBar'
import NewsFeed from './NewsFeed'
import FilteredNews from './FilteredNews'

const Home: React.FC = () => {
  const [showNewsFeed, setShowNewsFeed] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setIsAdmin(data)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-2'>
        <SearchField />
      </Container>

      <Container fluid className='mt-2'>
        <Row className='justify-content-center'>
          <Col md={12} lg={10} className='rounded border shadow p-4'>
            <Row>
              <Col xs={12} md={3} className='mt-5'>
                <PreferencesForm />
              </Col>
              <Col xs={12} md={9} className='p-3'>

                {showNewsFeed ? <NewsFeed /> : <FilteredNews />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
