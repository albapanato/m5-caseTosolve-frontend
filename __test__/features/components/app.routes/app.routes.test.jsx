import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../../../src/features/components/app.routes/App.routes'; // Ajusta la ruta según sea necesario
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../../src/features/components/home/Home', () => {
  const Home = () => <div>Home Component</div>;
  Home.displayName = 'Home';
  return Home;
});
jest.mock('../../../../src/features/components/list/List', () => {
  const List = () => <div>List Component</div>;
  List.displayName = 'List';
  return List;
});
jest.mock('../../../../src/features/components/film.detail/FilmDetail', () => {
  const FilmDetail = () => <div>FilmDetail Component</div>;
  FilmDetail.displayName = 'FilmDetail';
  return FilmDetail;
});
jest.mock('../../../../src/features/components/register/Register', () => {
  const Register = () => <div>Register Component</div>;
  Register.displayName = 'Register';
  return Register;
});
jest.mock('../../../../src/features/components/login/Login', () => {
  const Login = () => <div>Login Component</div>;
  Login.displayName = 'Login';
  return Login;
});
jest.mock(
  '../../../../src/features/components/create.edit.film/CreateOrEditFilm',
  () => {
    const CreateOrEditFilm = () => <div>CreateOrEditFilm Component</div>;
    CreateOrEditFilm.displayName = 'CreateOrEditFilm';
    return CreateOrEditFilm;
  }
);
jest.mock('../../../../src/features/components/user.films/UserFilms', () => {
  const UserFilms = () => <div>UserFilms Component</div>;
  UserFilms.displayName = 'UserFilms';
  return UserFilms;
});
jest.mock('../../../../src/features/components/error.page/ErrorPage', () => {
  const ErrorPage = () => <div>ErrorPage Component</div>;
  ErrorPage.displayName = 'ErrorPage';
  return ErrorPage;
});

describe('AppRoutes', () => {
  const renderWithRouter = (route) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );
  };

  it('renders Home component at "/" route', async () => {
    renderWithRouter('/');
    await waitFor(() => {
      expect(screen.getByText('Home Component')).toBeInTheDocument();
    });
  });

  it('renders List component at "/list" route', async () => {
    renderWithRouter('/list');
    await waitFor(() => {
      expect(screen.getByText('List Component')).toBeInTheDocument();
    });
  });

  it('renders FilmDetail component at "/detail/:id" route', async () => {
    renderWithRouter('/detail/1');
    await waitFor(() => {
      expect(screen.getByText('FilmDetail Component')).toBeInTheDocument();
    });
  });

  it('renders Register component at "/register" route', async () => {
    renderWithRouter('/register');
    await waitFor(() => {
      expect(screen.getByText('Register Component')).toBeInTheDocument();
    });
  });

  it('renders Login component at "/login" route', async () => {
    renderWithRouter('/login');
    await waitFor(() => {
      expect(screen.getByText('Login Component')).toBeInTheDocument();
    });
  });

  it('renders CreateOrEditFilm component at "/create" route', async () => {
    renderWithRouter('/create');
    await waitFor(() => {
      expect(
        screen.getByText('CreateOrEditFilm Component')
      ).toBeInTheDocument();
    });
  });

  it('renders UserFilms component at "/myfilms" route', async () => {
    renderWithRouter('/myfilms');
    await waitFor(() => {
      expect(screen.getByText('UserFilms Component')).toBeInTheDocument();
    });
  });

  it('renders ErrorPage component for non-existent routes', async () => {
    renderWithRouter('/some-non-existent-route');
    await waitFor(() => {
      expect(screen.getByText('ErrorPage Component')).toBeInTheDocument();
    });
  });
});
