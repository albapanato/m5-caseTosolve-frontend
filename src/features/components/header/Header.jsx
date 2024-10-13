import { Link } from 'react-router-dom';
import style from './Header.module.scss';
export function Header({ title, subtitle }) {
  return (
    <>
      <header className={style.header} id="header">
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        <h2>{subtitle}</h2>
      </header>
    </>
  );
}
