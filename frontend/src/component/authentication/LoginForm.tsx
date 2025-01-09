import React from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleSubmit = (values: FormValues) => {
    // Handle form submission (e.g., API call)
    console.log(values);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="text-center mb-4">Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>

                {/* Email Field */}
                <Form.Group controlId="email" className='mt-3'>
                  <Form.Label>Email</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="password" className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Field
                    name="password"
                    type="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Log in
                </Button>

                {/* Sign-In Text with Bootstrap Alert */}
                <Alert variant="info" className="mt-3 text-center">
                  Don't have an account? <a href="/register">Sign up</a>
                </Alert>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
