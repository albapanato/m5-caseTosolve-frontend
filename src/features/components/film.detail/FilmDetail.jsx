import { useNavigate, useParams } from 'react-router-dom';
import { useFilms } from '../../hooks/use.films';
import { Header } from '../header/Header';
import detailStyle from './FilmDetail.module.scss';
import { useUsers } from '../../hooks/use.users';
import { ComeBack } from '../come.back/ComeBack';
import Swal from 'sweetalert2';
export default function FilmDetail() {
  const { id } = useParams();
  const { token } = useUsers();
  const { films, handleDeleteFilm } = useFilms();
  const navigate = useNavigate();
  const item = films.find((item) => item.id === id);
  console.log(item);
  const handleDelete = () => {
    handleDeleteFilm(item.id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'GREAT SUCCESS!!',
      text: 'The film has been deleted',
      background: 'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'red',
      showConfirmButton: false,
      timer: 2000,
    });
    navigate('/list');
  };
  return (
    <>
      <Header title="Films" subtitle="Film Details"></Header>
      <ComeBack></ComeBack>
      <div className={detailStyle.details}>
        <img src={item.poster?.url} alt={item.title} />
        <ul>
          <li className={detailStyle.title}>
            {item.title} <span>({item.genre})</span>
          </li>
          <li>Released in {item.release}</li>
          <li className={detailStyle.description}>{item.synopsis}</li>
          <div className={detailStyle.editControllers}>
            {token ? (
              <>
                <button onClick={() => navigate(`/update/${item.id}`)}>
                  EDIT
                </button>
                <button onClick={handleDelete}>DELETE</button>{' '}
              </>
            ) : (
              <p>filmers</p>
            )}
          </div>
        </ul>
      </div>
    </>
  );
}
