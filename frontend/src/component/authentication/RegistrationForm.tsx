import React from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationForm: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
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
                {/* Name Field */}
                <Form.Group controlId="name" className='mt-3'>
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

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

                {/* Password Confirmation Field */}
                <Form.Group controlId="passwordConfirmation" className='mt-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Field
                    name="passwordConfirmation"
                    type="password"
                    className={`form-control ${touched.passwordConfirmation && errors.passwordConfirmation ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Register
                </Button>

                {/* Sign-In Text with Bootstrap Alert */}
                <Alert variant="info" className="mt-3 text-center">
                  Already have an account? <a href="/login">Sign In</a>
                </Alert>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
