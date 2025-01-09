import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomCard from '../shared/CustomCard'


const FilteredNews: React.FC = () => {
  return (
    <Container className='mt-5'>
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
  )
}

export default FilteredNews
