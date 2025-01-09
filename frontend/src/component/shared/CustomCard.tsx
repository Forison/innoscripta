import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

interface CardProps {
  id?: number
  imageSrc: string
  author: string
  date?: string
  title: string
  desc?: string
  showMore?: boolean
}

const CustomCard: React.FC<CardProps> = ({
  id,
  imageSrc,
  author,
  date = '',
  title,
  desc = '',
  showMore = true
}) => {
  return (
    <a href={`/newsfeed/${id}`}>
      <Card className='rounded border'>
        <Card.Img
          variant='top'
          src={imageSrc}
          alt='Card image'
          className='rounded'
        />
        <Card.Body>
          <Row className='align-items-center'>
            <Col xs={6}>
              <Card.Text className='text-muted small'>
                {author}
              </Card.Text>
            </Col>
            <Col xs={6} className='text-end'>
              <Card.Text className='text-muted small'>
                {date && `Published at: ${date}`}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Card.Title className='medium font-weight-bold'>{title}</Card.Title>
          <Card.Text className='small text-secondary'>
            {desc}
            {showMore && <span className='text-primary ml-5'>Read More</span>}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  )
}

export default CustomCard
