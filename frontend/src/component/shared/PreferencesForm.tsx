import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'

const Preferences: React.FC = () => {
  const sources = ['Source 1', 'Source 2', 'Source 3']
  const categories = ['Category 1', 'Category 2', 'Category 3']
  const authors = ['Author 1', 'Author 2', 'Author 3']


  return (
    <Formik
      initialValues={{
        source: '',
        category: '',
        author: '',
      }}
      onSubmit={(values) => {
        console.log('Filter applied:', values)
      }}
    >
      {() => (
        <FormikForm className='p-4'>
          <h3 className='mb-4'>Preferences</h3>
          <Row className='mb-3'>
            <Col xs={12}>
              <Form.Group controlId='source' className='mb-3'>
                <Form.Label className='small'>Source</Form.Label>
                <Field
                  as='select'
                  name='source'
                  className='form-select small'
                >
                  <option value=''>Select a Source</option>
                  {sources.map((source, idx) => (
                    <option key={idx} value={source}>
                      {source}
                    </option>
                  ))}
                </Field>
              </Form.Group>
            </Col>

            {/* Category Dropdown */}
            <Col xs={12}>
              <Form.Group controlId='category' className='mb-3'>
                <Form.Label className='small'>Category</Form.Label>
                <Field
                  as='select'
                  name='category'
                  className='form-select small'
                >
                  <option value=''>Select a Category</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
              </Form.Group>
            </Col>

            {/* Author Dropdown */}
            <Col xs={12}>
              <Form.Group controlId='author' className='mb-3'>
                <Form.Label className='small'>Author</Form.Label>
                <Field
                  as='select'
                  name='author'
                  className='form-select small'
                >
                  <option value=''>Select an Author</option>
                  {authors.map((author, idx) => (
                    <option key={idx} value={author}>
                      {author}
                    </option>
                  ))}
                </Field>
              </Form.Group>
            </Col>
          </Row>

          {/* Apply Filter Button */}
          <Button variant='secondary' type='submit' className='w-100'>
            Apply Filter
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default Preferences
