import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Register from '../../../../src/features/components/register/Register';
import { useUsers } from '../../../../src/features/hooks/use.users';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../../src/features/hooks/use.users', () => ({
  useUsers: jest.fn(),
}));

jest.mock('sweetalert2');

// Mockear useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Register Component', () => {
  const mockHandleRegisterUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useUsers.mockReturnValue({
      handleRegisterUser: mockHandleRegisterUser,
    });

    // Mockear useNavigate
    useNavigate.mockReturnValue(mockNavigate);

    jest.clearAllMocks();
  });

  it('renders registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('User Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('shows error alert when form is submitted with empty fields', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'REGISTER ERROR',
          text: 'Try again please',
        })
      );
    });
  });

  it('calls handleRegisterUser with correct data when form is submitted', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('User Name:'), {
      target: { value: 'User123' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockHandleRegisterUser).toHaveBeenCalledWith({
      userName: 'User123',
      email: 'user@example.com',
      password: 'password123',
    });

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'WELCOME TO FILMS',
          text: 'Redirecting to login process',
        })
      );
    });
  });

  it('navigates to /login when registration is successful', async () => {
    // Mockear el comportamiento de handleRegisterUser para simular un registro exitoso
    useUsers.mockReturnValue({
      handleRegisterUser: mockHandleRegisterUser,
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('User Name:'), {
      target: { value: 'User123' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
