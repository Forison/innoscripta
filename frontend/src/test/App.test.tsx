// src/test/App.test.js
import { render, screen } from '@testing-library/react';
import RegistrationForm from '../component/authentication/RegistrationForm';

test('renders the welcome message', () => {
  render(<RegistrationForm />);
  const welcomeElement = screen.getByText(/welcome to react-bootstrap/i);
  expect(welcomeElement).toBeInTheDocument();
});
