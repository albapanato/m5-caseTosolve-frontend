import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { ac, loginUserAsync, registerUserAsync } from '../redux/users.slice';
import { UserRepository } from '../../core/services/user.repository';
import { url } from '../../config';
export function useUsers() {
  const { users, currentUser, token, isError, userFilms } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();
  const repo = useMemo(() => new UserRepository(url), []);
  const handleRegisterUser = async (user) => {
    dispatch(registerUserAsync({ repo, user }));
  };
  const handleLoginUser = async (user) => {
    await dispatch(loginUserAsync({ repo, user }));
  };
  const handleLogoutUser = () => {
    dispatch(ac.logoutUser());
    localStorage.removeItem('userToken');
  };
  return {
    users,
    handleRegisterUser,
    handleLoginUser,
    currentUser,
    token: token,
    handleLogoutUser,
    isError,
    userFilms,
  };
}
