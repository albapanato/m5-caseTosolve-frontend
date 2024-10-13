import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CreateOrEditFilm from '../../../../src/features/components/create.edit.film/CreateOrEditFilm';
import { useFilms } from '../../../../src/features/hooks/use.films';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom'; // Para usar toBeInTheDocument y otros matchers

jest.mock('../../../../src/features/hooks/use.films');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('CreateOrEditFilm Component', () => {
  const mockHandleCreateFilm = jest.fn();
  const mockHandleUpdateFilm = jest.fn();
  const mockHandleLoadFilms = jest.fn();

  beforeEach(() => {
    useFilms.mockReturnValue({
      handleCreateFilm: mockHandleCreateFilm,
      handleUpdateFilm: mockHandleUpdateFilm,
      films: [],
      handleLoadFilms: mockHandleLoadFilms,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateOrEditFilm component', () => {
    render(
      <MemoryRouter>
        <CreateOrEditFilm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year of release/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select a genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/synopsis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add a poster/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add film/i })
    ).toBeInTheDocument();
  });

  test('submits the form to update a film', async () => {
    useFilms.mockReturnValueOnce({
      handleCreateFilm: mockHandleCreateFilm,
      handleUpdateFilm: mockHandleUpdateFilm,
      films: [
        {
          id: '1',
          title: 'Inception',
          release: '2010',
          genre: 'Sci-Fi',
          synopsis: 'A mind-bending thriller.',
        },
      ],
      handleLoadFilms: mockHandleLoadFilms,
    });

    render(
      <MemoryRouter initialEntries={['/update/1']}>
        <Routes>
          <Route path="/update/:id" element={<CreateOrEditFilm />} />
          <Route path="/list" element={<div>Film List</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check initial values
    expect(screen.getByLabelText(/title/i).value).toBe('Inception');

    // Fill out the form to update the film
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Interstellar' },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    });

    // Expectations
    expect(mockHandleUpdateFilm).toHaveBeenCalledTimes(1);
    expect(mockHandleUpdateFilm).toHaveBeenCalledWith(
      '1',
      expect.any(FormData)
    );
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'GREAT SUCCESS!!',
        text: 'The film has been updated correctly',
      })
    );
  });
});
