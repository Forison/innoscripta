import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SearchField from '../shared/SearchField'
import PreferencesForm from '../shared/PreferencesForm'
import NavigationBar from './NavigationBar'
import NewsFeed from './NewsFeed'
import FilteredNews from './FilteredNews'


const Home: React.FC = () => {
  const [showNewsFeed, setShowNewsFeed] = useState(true)

  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-5'>
        <Row className='justify-content-center'>
          <Col xs={12} md={10} lg={8} className='rounded border shadow p-4'>
            <Row>
              <Col xs={12} md={3} className='mt-5'>
                <PreferencesForm />
              </Col>

              <Col xs={12} md={9} className='p-3'>
                <SearchField />
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
