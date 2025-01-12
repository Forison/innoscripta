import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik'
import { User } from '../../interface'
import { useNavigate } from 'react-router-dom'
import AlertBanner from '../shared/AlertBanner'
import { loginSchema } from '../../schema/loginSchema'
import { authApiHandler } from '../../helper/authApiHandler'

const initialValues: User = {
  email: '',
  password: ''
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate()
  const [variant, setVariant] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (values: User) => {
    authApiHandler(
      'http://localhost:8000/api/v1/login',
      values,
      setVariant,
      setMessage,
      navigate,
      'Login successful',
      'Oops! Something went wrong'
    )
  }

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={4}>
          <h2 className='text-center mb-4'>Login</h2>
          {(message && variant) && <AlertBanner variant={variant} message={message} />}
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <FormikForm>

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

                <Button variant='primary' type='submit' className='w-100 mt-3'>
                  Login
                </Button>
                <AlertBanner
                  variant='info'
                  message={
                    // There is no security threat here, this is safe
                    <div dangerouslySetInnerHTML={{ __html: "Don't have an account? <a href='/register'>Sign Up</a>" }} />
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
