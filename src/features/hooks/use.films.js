import { useDispatch, useSelector } from 'react-redux';
import { FilmRepository } from '../../core/services/film.repository';
import { useCallback, useMemo } from 'react';
import {
  createFilmAsync,
  deleteFilmAsync,
  loadFilmsAsync,
  updateFilmAsync,
} from '../redux/films.slice';
import { url } from '../../config';
export function useFilms() {
  const { films, next, previous } = useSelector((state) => state.films);
  const { token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const repo = useMemo(() => new FilmRepository(url, token), [token]);
  const handleLoadFilms = useCallback(async () => {
    await dispatch(loadFilmsAsync({ repo, url: url + '/film' }));
  }, [repo, dispatch]);
  const handleCreateFilm = async (film) => {
    await dispatch(createFilmAsync({ repo, film }));
  };
  const handleUpdateFilm = async (id, film) => {
    await dispatch(updateFilmAsync({ repo, id, film }));
  };
  const handleDeleteFilm = async (id) => {
    await dispatch(deleteFilmAsync({ repo, id }));
  };
  const handlePaging = async (url) => {
    await dispatch(loadFilmsAsync({ repo, url }));
  };
  const handleLoadFiltered = async (genre) => {
    await dispatch(loadFilmsAsync({ repo, url, genre }));
  };
  return {
    films,
    handleLoadFilms,
    handleCreateFilm,
    handleUpdateFilm,
    handleDeleteFilm,
    handlePaging,
    handleLoadFiltered,
    next,
    previous,
  };
}
