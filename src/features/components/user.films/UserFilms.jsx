import { useEffect } from 'react';
import { useFilms } from '../../hooks/use.films';
import { useUsers } from '../../hooks/use.users';
import { FilmCard } from '../film/FilmCard';
import style from './UserFilms.module.scss';
import { Header } from '../header/Header';
import { ComeBack } from '../come.back/ComeBack';
export default function UserFilms() {
  const { handleLoadFilms } = useFilms();
  const { userFilms, token } = useUsers();
  useEffect(() => {
    handleLoadFilms(); // aqui he añadido (); porque no estaba siendo llamada la funcion
  }, [handleLoadFilms]);
  const films = userFilms;
  // return (
  //   <>
  //     <Header title={'Films'} subtitle={'Your Films'}></Header>
  //     <ComeBack></ComeBack>
  //     <ul className={style.list}>
  //       {token ? (
  //         films.map((film) => <FilmCard key={film.id} item={film}></FilmCard>)
  //       ) : (
  //         <p>Sorry, you haven&apos;t added any film yet</p>
  //       )}
  //     </ul>
  //   </>
  // );
  // Bloque modificado:
  return (
    <>
      <Header title={'Films'} subtitle={'Your Films'} />
      <ComeBack />
      <ul className={style.list}>
        {token ? (
          films.length > 0 ? ( // Cambiamos aquí para verificar el número de películas
            films.map((film) => <FilmCard key={film.id} item={film} />)
          ) : (
            <p>Sorry, you haven&apos;t added any film yet</p>
          )
        ) : (
          <p>Please log in to see your films</p> // Mensaje si no hay token
        )}
      </ul>
    </>
  );
}
