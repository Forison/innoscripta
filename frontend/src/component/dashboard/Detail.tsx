import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'
import { Article } from '../../interface'
import NavigationBar from './NavigationBar'


const Detail: React.FC = () => {
  // const [article, setArticle] = useState<Article>

  useEffect(() => {
    // console.log(article)
  }, [])

  return (
    <>
      <NavigationBar />
      <Container fluid className='mt-5'>
        <Row className='justify-content-center'>
          <Col md={12} lg={6} className='rounded border shadow p-4'>
            <CustomCard
              showMore={false}
              author='Kofi Addo'
              title='This is the most amazing title amongst all the title of the tile'
              date='January 24, 2025'
              imageSrc='https://picsum.photos/id/237/250'
              desc='This is an amazing description is the This is an
                         amazing description is the This is an amazing description is the This 
                         is an amazing description is the '
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Detail
