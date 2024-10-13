import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../../features/redux/users.slice';
import filmsSlice from '../../features/redux/films.slice';
export const store = configureStore({
  reducer: {
    users: usersSlice,
    films: filmsSlice,
  },
});
