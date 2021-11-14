import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  act(() => {
    render(<App />);
  })
  const linkElement = screen.getByText(/export/i);
  expect(linkElement).toBeInTheDocument();
});
