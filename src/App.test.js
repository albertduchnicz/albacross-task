import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders Binance API link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Connected to BINANCE API/i);
  expect(linkElement).toBeInTheDocument();
});
