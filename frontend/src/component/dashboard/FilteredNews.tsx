import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'
import { Article } from '../../interface'


const FilteredNews: React.FC<Article[]> = (articles) => {
  return (
    <Container className='mt-5'>
      <Row>
        {articles.map((article, index) => (
          <Col xs={6} md={4} key={index}>
            <CustomCard
              id={article.id}
              author={article.author}
              title={article.title}
              imageSrc={article.urlToImage}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FilteredNews
