import style from './ComeBack.module.scss';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
export function ComeBack() {
  return (
    <>
      <header className={style.comeback} id="header">
        <Link to={'/'} className={style.logo}>
          <div>
            <ImHome />
          </div>
        </Link>
      </header>
    </>
  );
}
