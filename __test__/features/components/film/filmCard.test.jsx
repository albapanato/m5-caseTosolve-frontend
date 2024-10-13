import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FilmCard } from '../../../../src/features/components/film/FilmCard';
import '@testing-library/jest-dom';

describe('FilmCard Component', () => {
  const mockFilm = {
    id: '1',
    title: 'Inception',
    poster: {
      url: '/inception.jpg',
    },
  };

  test('renders the film card with correct attributes', () => {
    render(
      <MemoryRouter>
        <FilmCard item={mockFilm} />
      </MemoryRouter>
    );

    // Verificar el Link y su URL
    const linkElement = screen.getByRole('link', { name: /inception/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/detail/1');

    // Verificar la imagen
    const imgElement = screen.getByRole('img', { name: /inception/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/inception.jpg');
    expect(imgElement).toHaveAttribute('alt', 'Inception');
    expect(imgElement).toHaveAttribute('width', '150');
    expect(imgElement).toHaveAttribute('height', '250');

    // Verificar el título
    const titleElement = screen.getByText('Inception');
    expect(titleElement).toBeInTheDocument();
  });
});
