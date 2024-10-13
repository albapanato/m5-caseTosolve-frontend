import { useFilms } from '../../hooks/use.films';
import { useEffect } from 'react';
import { Header } from '../header/Header';
import style from './CreateOrEditFilm.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LuImagePlus } from 'react-icons/lu';
export default function CreateOrEditFilm() {
  const { handleCreateFilm, handleUpdateFilm, films, handleLoadFilms } =
    useFilms();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const existingFilm = films.find((film) => film.id === id);
      if (!existingFilm) {
        handleLoadFilms();
      }
      if (existingFilm) {
        const form = document.querySelector('.form-nice');
        form.elements.namedItem('title').value = existingFilm.title;
        form.elements.namedItem('release').value = existingFilm.release;
        form.elements.namedItem('genre').value = existingFilm.genre;
        form.elements.namedItem('synopsis').value = existingFilm.synopsis;
      }
    }
  }, [id, films, handleLoadFilms]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const filmForm = event.target;
    const filmData = new FormData(filmForm);
    if (id) {
      await handleUpdateFilm(id, filmData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'GREAT SUCCESS!!',
        text: 'The film has been updated correctly',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await handleCreateFilm(filmData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'GREAT SUCCESS!!',
        text: 'The film has been added to the list',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    navigate('/list');
  };
  return (
    <>
      <Header title="Films" subtitle="Create Film"></Header>

      <div className={style.form}>
        <form onSubmit={handleSubmit} aria-label="form" className="form-nice">
          <div className={style.inputs}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="release">Year of release: </label>
            <input type="text" id="release" name="release" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="genre">Select a genre: </label>
            <select name="genre" id="genre" required>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Animation">Animation</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>
          <div className={style.inputs}>
            <label htmlFor="synopsis">Synopsis: </label>
            <textarea
              name="synopsis"
              id="synopsis"
              cols={100}
              rows={5}
              required
            ></textarea>
          </div>
          {id ? (
            <p>Not possible to change the film poster</p>
          ) : (
            <div className={style.inputs}>
              <label className={style.file} htmlFor="poster">
                Add a poster{' '}
                <span>
                  <LuImagePlus />
                </span>
              </label>
              <input
                type="file"
                id="poster"
                name="poster"
                accept=".png"
                required
              />
            </div>
          )}
          {id ? (
            <div className={style.submit}>
              <button type="submit">Save Changes</button>
            </div>
          ) : (
            <div className={style.submit}>
              <button type="submit">Add Film</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
