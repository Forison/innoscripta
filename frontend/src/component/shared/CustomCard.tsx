import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { timeFormatter } from '../../helper/timeFormatter'
import Loading from './Loading'
import { RootState } from '../redux/store'

interface CardProps {
  imageSrc: string
  author: string
  id?: number
  date?: string
  title: string
  desc?: string
  showMore?: boolean
  content?: string
  website?: string
}

const placeholder = 'https://wwwimage-tve.cbsstatic.com/thumbnails/photos/w1920-q80/marquee/1042340/cen_sp_hero_landscape_0.jpg'

const CustomCard: React.FC<CardProps> = ({
  id,
  title,
  imageSrc,
  author,
  date = '',
  desc = '',
  showMore = true,
  content = '',
  website = '',
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>()
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin)

  useEffect(() => {
    setIsLoaded(true)
    setCurrentImage(imageSrc)
  }, [imageSrc])

  const handleImageError = () => setCurrentImage(placeholder)
  const handleClick = () => navigate(`/newsfeed/${id}`)
  const handleDelete = () => {
    fetch(`http://localhost:8000/api/v1/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error))
  }

  if (!isLoaded) return <Loading />

  return (
    <Card className='rounded cursor-pointer' onClick={handleClick}>
      {currentImage && (
        <Card.Img
          variant='top'
          src={currentImage}
          alt='Card image'
          className='rounded'
          onError={handleImageError}
        />
      )}
      <Card.Body>
        <Row className='align-items-center'>
          <Col xs={6}>
            <Card.Text className='text-muted small'>
              {author && `Author: ${author}`}
            </Card.Text>
          </Col>
          <Col xs={6} className='text-end'>
            <Card.Text className='text-muted small'>
              {date && `Published on: ${timeFormatter(date)}`}
            </Card.Text>
          </Col>
        </Row>
        <hr />
        <Card.Title className='medium font-weight-bold'>{title}</Card.Title>
        <Card.Text className='small text-secondary'>
          {desc}
          {content && <>{content}</>}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          {website && (
            <>
              {showMore && <span className='text-primary ml-5'>Read More</span>}
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary"> Visit News Page</a>
            </>)}
          {isAdmin && (
            <FaTrash
              className="text-danger cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default CustomCard
