import { useEffect } from 'react';
import { useFilms } from '../../hooks/use.films';
import { Header } from '../header/Header';
import style from './List.module.scss';
import { FilmCard } from '../film/FilmCard';
import { useUsers } from '../../hooks/use.users';
import { useNavigate } from 'react-router-dom';
import { PiFilmSlate } from 'react-icons/pi';
import { GiFilmProjector } from 'react-icons/gi';
import { ImExit } from 'react-icons/im';
import { FilterFilms } from '../filter.films/FilterFilms';
import Swal from 'sweetalert2';
export default function List() {
  const { films, handleLoadFilms } = useFilms();
  const { handleLogoutUser, token, currentUser } = useUsers();
  const navigate = useNavigate();
  useEffect(() => {
    handleLoadFilms();
  }, [handleLoadFilms]);
  const handleUser = () => {
    Swal.fire({
      width: '20em',
      title: 'SEE YOU SOON',
      text: 'Enjoy your films',
      background: 'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
      color: 'red',
      showConfirmButton: false,
      padding: '4em 0',
      timer: 2000,
    });
    handleLogoutUser();
    navigate('/');
  };
  return (
    <>
      <div className={style.list}>
        <Header title="Films" subtitle="Feel your Films"></Header>
        {token ? (
          <>
            <section className={style.greetings}>
              <p>Hi {currentUser}</p>
              <div className={style.userControls}>
                <div>
                  <button onClick={() => navigate('/create')}>
                    ADD A FILM{' '}
                  </button>
                  <span>
                    <PiFilmSlate />
                  </span>
                </div>
                <div>
                  <button onClick={() => navigate('/myfilms')}>
                    YOUR FILMS{' '}
                  </button>
                  <span>
                    <GiFilmProjector />
                  </span>
                </div>
                <div>
                  <button onClick={handleUser}>LOG OUT </button>
                  <span>
                    <ImExit />
                  </span>
                </div>
              </div>
            </section>
          </>
        ) : (
          ''
        )}
        <FilterFilms></FilterFilms>
        <div className={style.films}>
          <ul>
            {films.map((item) => (
              <FilmCard key={item.id} item={item}></FilmCard>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
