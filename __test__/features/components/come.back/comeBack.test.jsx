import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Sirve para simular el entorno de enrutamiento, permitiendo que el componente ComeBack funcione correctamente al ser renderizado.
import { ComeBack } from '../../../../src/features/components/come.back/ComeBack';

describe('ComeBack component', () => {
  test('renders ComeBack component with home link', () => {
    render(
      <MemoryRouter>
        {' '}
        /
        <ComeBack />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument(); // Verificamos que "link" esta en el documento
    expect(homeLink).toHaveAttribute('href', '/'); // Que exista en la ruta localhost:7777
  });

  test('displays home icon', () => {
    render(
      <MemoryRouter>
        <ComeBack />
      </MemoryRouter>
    );

    // Verifica que el ícono de casa esté presente
    const icon = screen.getByTestId('home-icon'); // Hacemos referencia a lo que se ha añadido al div del componente ComeBack < data-testid="home-icon" >
    expect(icon).toBeInTheDocument();
  });
});
