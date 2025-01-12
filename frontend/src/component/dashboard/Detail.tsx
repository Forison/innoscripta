import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'
import { Article } from '../../interface'
import NavigationBar from './NavigationBar'

const ARTICLE: Article = {
  id: 0,
  sourceId: '',
  sourceName: '',
  author: '',
  title: '',
  description: '',
  url: '',
  urlToImage: '',
  publishedAt: '',
  content: '',
}

const Detail: React.FC = () => {
  const [article, setArticle] = useState<Article>(ARTICLE)
  const { id } = useParams<{ id?: string }>()
  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/articles/${id}`, {
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
          setArticle(data)
        })
        .catch((error) => console.error('Error:', error))
    }
  }, [id])

  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-5'>
        <Row className='justify-content-center'>
          <Col md={12} lg={6} className='rounded border p-4'>
            <CustomCard
              id={article.id}
              showMore={false}
              author={article.author}
              title={article.title}
              date={article.publishedAt}
              imageSrc={article.urlToImage}
              desc={article.description}
              content={article.content}
              website={article.url}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Detail
