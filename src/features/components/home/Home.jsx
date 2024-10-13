import { Link } from 'react-router-dom';
import { Header } from '../header/Header';
import { GiFilmSpool } from 'react-icons/gi';
import style from './Home.module.scss';
export default function Home() {
  return (
    <>
      <div className={style.home}>
        <Header title="Films" subtitle="Feel your films"></Header>
        <div className={style.welcome}>
          <p className={style.intro}>
            Welcome to a unique place where you can express your feelings about
            the films you have watched, and share them with the whole world.
            Remember that the only condition to express your emotions is by
            using a single unique sentence.
          </p>
          <div className={style.films}>
            <p>Feeling shy about sharing your emotions?</p>{' '}
            <p>
              Don&apos;t worry, feel free to take a look to our list of{' '}
              <Link to={'/list'}>Films</Link>.
            </p>
          </div>
          <Link
            to={'/list'}
            className={style.reel}
            aria-label="Access to the list of films clicking in this icon button."
          >
            <span>
              <GiFilmSpool />
            </span>
          </Link>
          <div className={style.register}>
            <p>If you are ready to share your feelings</p>
            <p>
              <Link to={'/register'}>create your account here </Link>
              and get started.
            </p>
          </div>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}
