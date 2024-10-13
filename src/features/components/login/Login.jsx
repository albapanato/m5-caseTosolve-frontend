import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { useEffect } from 'react';
import { Header } from '../header/Header';
import style from './Login.module.scss';
import Swal from 'sweetalert2';
export default function Login() {
  const { handleLoginUser, isError } = useUsers();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    const loggedUser = {
      user: element.elements.namedItem('user').value,
      password: element.elements.namedItem('password').value,
    };
    handleLoginUser(loggedUser);
    Swal.fire({
      width: '20em',
      icon: 'success',
      title: 'LOGIN SUCCESS!',
      text: 'Redirecting to the list of films',
      background: 'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'green',
      showConfirmButton: false,
      padding: '4em 0',
      timer: 2000,
    });
    element.reset();
  };
  useEffect(() => {
    if (isError === null) {
      return;
    }
    if (isError === false) {
      navigate('/list');
    } else {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR',
        text: 'INVALID USERNAME OR PASSWORD',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    }
  }, [isError, navigate]);
  return (
    <>
      <Header title="Films" subtitle="Login"></Header>

      <div className={style.form}>
        <form aria-label="form" onSubmit={handleSubmit} role="form">
          <div className={style.inputs}>
            <label htmlFor="user">User</label>
            <input type="text" id="user" name="user" required />
          </div>
          <div className={style.inputs}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={style.submit}>
            <button role="button" aria-selected="true" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
