import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserFilms from '../../../../src/features/components/user.films/UserFilms';
import { useFilms } from '../../../../src/features/hooks/use.films';
import { useUsers } from '../../../../src/features/hooks/use.users';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../../src/features/hooks/use.films', () => ({
  useFilms: jest.fn(),
}));

jest.mock('../../../../src/features/hooks/use.users', () => ({
  useUsers: jest.fn(),
}));

jest.mock('../../../../src/features/components/film/FilmCard', () => ({
  FilmCard: jest.fn(() => <div>Film Card</div>),
}));

describe('UserFilms Component', () => {
  const mockHandleLoadFilms = jest.fn();

  beforeEach(() => {
    useFilms.mockReturnValue({
      handleLoadFilms: mockHandleLoadFilms,
    });

    jest.clearAllMocks();
  });

  it('renders UserFilms and displays user films', async () => {
    // Mockeamos useUsers para simular que el usuario tiene filmes
    useUsers.mockReturnValue({
      userFilms: [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' },
      ],
      token: 'mockToken',
    });

    render(
      <MemoryRouter>
        <UserFilms />
      </MemoryRouter>
    );

    // Verificamos que el componente ha llamado a handleLoadFilms
    expect(mockHandleLoadFilms).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Films')).toBeInTheDocument();
      expect(screen.getByText('Your Films')).toBeInTheDocument();
      expect(screen.getAllByText('Film Card')).toHaveLength(2); // Dos películas
    });
  });

  it('renders message when user has no films', async () => {
    // Mockeamos useUsers para simular que el usuario no tiene filmes
    useUsers.mockReturnValue({
      userFilms: [], // No hay filmes
      token: 'mockToken', // Token presente
    });

    render(
      <MemoryRouter>
        <UserFilms />
      </MemoryRouter>
    );

    // Verifica que el mensaje aparezca
    await waitFor(() => {
      expect(
        screen.getByText("Sorry, you haven't added any film yet")
      ).toBeInTheDocument();
    });
  });

  it('renders message when token is missing', async () => {
    // Mockeamos useUsers para simular que el usuario no tiene token
    useUsers.mockReturnValue({
      userFilms: [],
      token: null,
    });

    render(
      <MemoryRouter>
        <UserFilms />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Please log in to see your films')
      ).toBeInTheDocument();
    });
  });
});
