import React, { useEffect, FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'
import TopStoriesCard from '../shared/TopStoriesCard'
import NewsWrapper from './FeedWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setArticles } from '../redux/articleSlice'
import AlertBanner from '../shared/AlertBanner'

const Index: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  const latestNews = articles[0]
  const otherRecentNews = articles.slice(1, 3)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => dispatch(setArticles(data)))
      .catch(error => console.error('Error:', error))
  }, [dispatch])

  if (articles.length === 0) {
    return <AlertBanner variant='info' message='No news Item found' />
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={12} lg={8}>
            <h3 className='mb-3'>Latest News</h3>
            <CustomCard
              id={latestNews?.id}
              author={latestNews?.author}
              title={latestNews?.title}
              imageSrc={latestNews?.urlToImage}
              date={latestNews?.publishedAt}
              showMore
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='mt-5'>
            {otherRecentNews?.map((article, index) => (
              <React.Fragment key={index}>
                <TopStoriesCard
                  id={article.id}
                  title={article.title}
                  desc={article.description}
                  imageSrc={article.urlToImage}
                />
              </React.Fragment>
            ))}
          </Col>
        </Row>
      </Container>

      <Container className='mt-5'>
        <h3 className='mb-4'>Stories</h3>
        <Row>
          {articles.slice(3).map((article, index) => (
            <Col xs={12} md={6} lg={4} key={index + 1} className="mt-3">
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
    </>
  )
}


const NewsFeed: FC = (): JSX.Element => (
  <NewsWrapper>
    <Index />
  </NewsWrapper>
)

export default NewsFeed
