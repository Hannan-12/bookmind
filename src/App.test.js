import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from './components/layout/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

beforeEach(() => {
  localStorage.clear();
  document.body.classList.remove('dark-theme');
});

test('renders theme controls and applies the selected theme', () => {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  const darkModeButton = screen.getByRole('button', { name: '🌙' });
  expect(darkModeButton).toBeInTheDocument();

  fireEvent.click(darkModeButton);

  expect(darkModeButton).toHaveClass('active');
  expect(document.body).toHaveClass('dark-theme');
  expect(localStorage.getItem('theme')).toBe('dark');
});
