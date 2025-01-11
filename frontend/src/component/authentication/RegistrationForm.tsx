import React, { useState } from 'react'
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik'
import { registrationSchema } from '../../schema/registrationSchema'
import { User } from '../../interface'
import { useNavigate } from 'react-router-dom'
import AlertBanner from '../shared/AlertBanner'
import { authApiHandler } from '../../helper/authApiHandler'

const initialValues: User = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate()
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (values: User) => {
    authApiHandler(
      'http://localhost:8000/api/v1/register',
      values,
      setVariant,
      setMessage,
      navigate,
      'Registration successful',
      'Oops! Something went wrong'
    )
  }

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={4}>
          <h2 className='text-center mb-4'>Register</h2>
          {(message && variant) && <AlertBanner variant={variant} message={message} />}
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <FormikForm>
                <Form.Group controlId='name' className='mt-3'>
                  <Form.Label>Name</Form.Label>
                  <Field
                    name='name'
                    type='text'
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='name' component='div' className='invalid-feedback' />
                </Form.Group>

                <Form.Group controlId='email' className='mt-3'>
                  <Form.Label>Email</Form.Label>
                  <Field
                    name='email'
                    type='email'
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='email' component='div' className='invalid-feedback' />
                </Form.Group>

                <Form.Group controlId='password' className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Field
                    name='password'
                    type='password'
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='password' component='div' className='invalid-feedback' />
                </Form.Group>

                <Form.Group controlId='passwordConfirmation' className='mt-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Field
                    name='passwordConfirmation'
                    type='password'
                    className={`form-control ${touched.passwordConfirmation && errors.passwordConfirmation ? 'is-invalid' : ''
                      }`}
                  />
                  <ErrorMessage name='passwordConfirmation' component='div' className='invalid-feedback' />
                </Form.Group>

                <Button variant='primary' type='submit' className='w-100 mt-3'>
                  Register
                </Button>
                <AlertBanner
                  variant='info'
                  message={
                    <div dangerouslySetInnerHTML={{ __html: "Already have an account? <a href='/login'>Sign In</a>" }} />
                  }
                />
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationForm
