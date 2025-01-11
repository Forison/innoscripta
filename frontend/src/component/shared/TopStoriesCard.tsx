import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

interface CardProps {
  imageSrc: string
  title: string
  desc: string
  id: number
}

const TopStoriesCard: React.FC<CardProps> = ({ id, imageSrc, title, desc }) => {
  return (
    <Card className='mb-4 px-1 cursor-pointer'>
      <Row className='align-items-center'>
        <h6 className='text-center p-1 pt-2 medium font-weight-bold'>{title}</h6>
        <Col xs={12} md={7}>
          <Card.Body>
            <Card.Text className='small text-secondary'>
              {desc.slice(0, 50) + '...'}
            </Card.Text>
          </Card.Body>
        </Col>

        <Col xs={12} md={5} className='d-flex justify-content-center'>
          <Card.Img
            variant='top'
            src={imageSrc}
            style={{
              borderRadius: '10px',
              objectFit: 'cover',
              height: '100%',
              maxHeight: '200px',
              marginBottom: '15px',
            }}
          />
        </Col>
        <a href={`/newsfeed/${id}`} className='text-primary text-center pb-1 small'>Read More</a>
      </Row>
    </Card>
  )
}

export default TopStoriesCard
