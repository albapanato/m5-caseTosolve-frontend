import { render, screen, fireEvent } from '@testing-library/react';
import { FilterFilms } from '../../../../src/features/components/filter.films/FilterFilms';
import { useFilms } from '../../../../src/features/hooks/use.films';
import '@testing-library/jest-dom/extend-expect';
// Mockeando el hook useFilms
jest.mock('../../../../src/features/hooks/use.films');

describe('FilterFilms Component', () => {
  const mockHandleLoadFiltered = jest.fn();
  const mockHandleLoadFilms = jest.fn();
  const mockHandlePaging = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useFilms.mockReturnValue({
      handleLoadFiltered: mockHandleLoadFiltered,
      handleLoadFilms: mockHandleLoadFilms,
      handlePaging: mockHandlePaging,
      next: 'next-page-url',
      previous: null, // No hay página anterior en este caso
    });
  });

  test('renders the component correctly', () => {
    render(<FilterFilms />);

    // Verificar que se renderiza el botón "Show All"
    const showAllButton = screen.getByRole('button', { name: /show all/i });
    expect(showAllButton).toBeInTheDocument();

    // Verificar que se renderizan los botones de paginación
    const nextButton = screen.getByRole('button', { name: />/i });
    expect(nextButton).toBeInTheDocument();
    const prevButton = screen.getByRole('button', { name: /</i });
    expect(prevButton).toBeInTheDocument();

    // Verificar que el botón de paginación anterior está deshabilitado
    expect(prevButton).toBeDisabled();

    // Verificar que el selector de género está presente
    const genreSelect = screen.getByRole('combobox');
    expect(genreSelect).toBeInTheDocument();
  });

  test('calls handleLoadFilms when "Show All" button is clicked', () => {
    render(<FilterFilms />);

    const showAllButton = screen.getByRole('button', { name: /show all/i });
    fireEvent.click(showAllButton);

    expect(mockHandleLoadFilms).toHaveBeenCalledTimes(1);
  });

  test('calls handleLoadFiltered when genre is selected', () => {
    render(<FilterFilms />);

    const genreSelect = screen.getByRole('combobox');
    fireEvent.change(genreSelect, { target: { value: 'Action' } });

    expect(mockHandleLoadFiltered).toHaveBeenCalledWith('genre=Action');
  });

  test('calls handlePaging with next page URL when next button is clicked', () => {
    render(<FilterFilms />);

    const nextButton = screen.getByRole('button', { name: />/i });
    fireEvent.click(nextButton);

    expect(mockHandlePaging).toHaveBeenCalledWith('next-page-url');
  });

  test('does not call handlePaging when previous button is clicked if no previous URL exists', () => {
    render(<FilterFilms />);

    const prevButton = screen.getByRole('button', { name: /</i });
    fireEvent.click(prevButton);

    expect(mockHandlePaging).not.toHaveBeenCalled(); // Se espera que no se llame
  });

  test('disables the next button if no next URL is provided', () => {
    useFilms.mockReturnValue({
      handleLoadFiltered: mockHandleLoadFiltered,
      handleLoadFilms: mockHandleLoadFilms,
      handlePaging: mockHandlePaging,
      next: null, // No hay página siguiente en este caso
      previous: 'previous-page-url',
    });

    render(<FilterFilms />);

    const nextButton = screen.getByRole('button', { name: />/i });
    expect(nextButton).toBeDisabled();
  });
});
