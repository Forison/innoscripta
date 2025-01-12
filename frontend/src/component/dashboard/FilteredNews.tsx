import React, { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CustomCard from '../shared/CustomCard'
import { Article } from '../../interface'
import NewsWrapper from './FeedWrapper'
import { RootState } from '../redux/store'
import AlertBanner from '../shared/AlertBanner'

interface Props {
  articles: Article[]
}

const Index: React.FC<Props> = ({ articles }) => {
  if (articles.length === 0) {
    return <AlertBanner variant='info' message='No result found' />
  }
  return (
    <Container className='mt-5'>
      <Row>
        {articles.map((article, index) => (
          <Col xs={6} md={4} key={index} className='mb-2'>
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

const FilteredNews: FC = (): JSX.Element => {
  const { articles } = useSelector((state: RootState) => state.articles)
  return (
    <NewsWrapper>
      <Index articles={articles} />
    </NewsWrapper>
  )
}

export default FilteredNews
