import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from '../../../../src/features/components/login/Login';
import { useUsers } from '../../../../src/features/hooks/use.users';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom/extend-expect'; // Importar para usar toBeInTheDocument

jest.mock('../../../../src/features/hooks/use.users', () => ({
  useUsers: jest.fn(),
}));

jest.mock('sweetalert2');

// Mockear useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockHandleLoginUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useUsers.mockReturnValue({
      handleLoginUser: mockHandleLoginUser,
      isError: null,
    });

    // Mockear useNavigate
    useNavigate.mockReturnValue(mockNavigate);

    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('User')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('calls handleLoginUser with correct credentials on form submit', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('User'), {
      target: { value: 'User123' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(mockHandleLoginUser).toHaveBeenCalledWith({
      user: 'User123',
      password: 'password123',
    });

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'LOGIN SUCCESS!',
          text: 'Redirecting to the list of films',
        })
      );
    });
  });

  it('navigates to /list when login is successful', async () => {
    useUsers.mockReturnValue({
      handleLoginUser: mockHandleLoginUser,
      isError: false,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/list');
    });
  });

  it('shows error alert when login fails', async () => {
    useUsers.mockReturnValue({
      handleLoginUser: mockHandleLoginUser,
      isError: true,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'ERROR',
          text: 'INVALID USERNAME OR PASSWORD',
        })
      );
    });
  });
});
