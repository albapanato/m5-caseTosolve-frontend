import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import FilmDetail from '../../../../src/features/components/film.detail/FilmDetail'; // Ajusta la ruta según tu estructura de carpetas
import { useFilms } from '../../../../src/features/hooks/use.films';
import { useUsers } from '../../../../src/features/hooks/use.users';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';

// Mocking hooks
jest.mock('../../../../src/features/hooks/use.films');
jest.mock('../../../../src/features/hooks/use.users');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mockear useNavigate
}));
jest.mock('sweetalert2');

describe('FilmDetail Component', () => {
  const mockFilm = {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    release: '2010',
    synopsis: 'A mind-bending thriller',
    poster: {
      url: '/inception.jpg',
    },
  };

  beforeEach(() => {
    // Mock useFilms hook
    useFilms.mockReturnValue({
      films: [mockFilm],
      handleDeleteFilm: jest.fn(),
    });

    // Mock useUsers hook
    useUsers.mockReturnValue({
      token: 'valid-token',
    });

    // Mock SweetAlert
    Swal.fire.mockResolvedValue({ isConfirmed: true });
  });

  test('renders the film details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<FilmDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar la imagen
    const imgElement = screen.getByRole('img', { name: /inception/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/inception.jpg');

    // Verificar el título, género y año de lanzamiento
    const titleElement = screen.getByText('Inception');
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText('(Sci-Fi)')).toBeInTheDocument();
    expect(screen.getByText('Released in 2010')).toBeInTheDocument();

    // Verificar la sinopsis
    expect(screen.getByText('A mind-bending thriller')).toBeInTheDocument();
  });

  test('shows edit and delete buttons when token is present', () => {
    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<FilmDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar que los botones EDIT y DELETE están presentes
    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('navigates to edit page on edit button click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<FilmDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/update/1');
  });

  test('calls handleDelete and shows Swal on delete button click', async () => {
    const mockHandleDeleteFilm = jest.fn();
    useFilms.mockReturnValue({
      films: [mockFilm],
      handleDeleteFilm: mockHandleDeleteFilm,
    });

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<FilmDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteFilm).toHaveBeenCalledWith('1');
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'GREAT SUCCESS!!',
        text: 'The film has been deleted',
      })
    );
  });

  test('does not show edit and delete buttons if token is not present', () => {
    useUsers.mockReturnValue({
      token: null,
    });

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<FilmDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.queryByRole('button', { name: /edit/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText('filmers')).toBeInTheDocument();
  });
});
