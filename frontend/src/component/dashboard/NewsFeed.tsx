import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'
import TopStoriesCard from '../shared/TopStoriesCard'


const NewsFeed: React.FC = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3 className='mb-4'>Latest News</h3>
            <CustomCard
              id={1}
              author='Kofi Addo'
              title='This is the most amazing title amongst all the title of the tile'
              date='January 24, 2025'
              imageSrc='https://picsum.photos/id/237/250'
              desc='This is an amazing description is the This is an amazing description is the This is an amazing description is the This is an amazing description is the '
            />
          </Col>
          <Col xs={12} md={4}>
            <h3 className='mb-4'>Trending News</h3>
            <TopStoriesCard
              id={1}
              title='This is a cool title for the cool dude'
              desc='This is a cool description for the coolest ...'
              imageSrc='https://picsum.photos/id/237/250'
            />
          </Col>
        </Row>
      </Container>

      <Container className='mt-5'>
        <h3 className='mb-4'>Trending News</h3>
        <Row>
          <Col xs={6} md={4}>
            <CustomCard
              id={1}
              author='Kofi Addo'
              title='This is the most amazing title amongst all the title of the tile'
              imageSrc='https://picsum.photos/id/237/250'
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewsFeed
