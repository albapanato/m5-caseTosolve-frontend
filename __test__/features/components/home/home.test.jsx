import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../../src/features/components/home/Home';

describe('Home Component', () => {
  test('it should renders the welcome message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /Welcome to a unique place where you can express your feelings/i
      )
    ).toBeInTheDocument();
  });
  test('it should renders Header component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que el título y el subtítulo del Header se rendericen correctamente
    const titleElement = screen.getByRole('heading', { level: 1 });
    const subtitleElement = screen.getByRole('heading', { level: 2 });

    expect(titleElement).toHaveTextContent('Films'); // El título pasado como prop en Home
    expect(subtitleElement).toHaveTextContent('Feel your films'); // El subtítulo pasado como prop en Home
  });

  test('it should renders links to films list and register', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Usar getAllByRole si hay múltiples enlaces
    const links = screen.getAllByRole('link');

    // Verifica que uno de los enlaces tenga el texto correcto
    const filmsLink = links.find(
      (link) => link.getAttribute('href') === '/list'
    );
    expect(filmsLink).toBeInTheDocument();

    const registerLink = links.find(
      (link) => link.getAttribute('href') === '/register'
    );
    expect(registerLink).toBeInTheDocument();
  });

  test('it should renders login button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('it should renders the GiFilmSpool icon', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const reelLink = screen.getByLabelText(
      /access to the list of films clicking in this icon button/i
    );
    expect(reelLink).toBeInTheDocument();
    expect(reelLink).toHaveAttribute('href', '/list');
  });
});
