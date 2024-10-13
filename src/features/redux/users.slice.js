import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  currentUser: '',
  token: localStorage.getItem('userToken'),
  isError: null,
  userFilms: [],
};
export const registerUserAsync = createAsyncThunk(
  'users/register',
  async ({ repo, user }) => {
    return await repo.register(user);
  },
);
export const loginUserAsync = createAsyncThunk(
  'users/login',
  async ({ repo, user }) => {
    const result = await repo.login(user);
    localStorage.setItem('userToken', result.token);
    return result;
  },
);
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => ({
      ...state,
      token: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.rejected, (state) => ({
      ...state,
      isError: true,
    }));
    builder.addCase(loginUserAsync.pending, (state) => ({
      ...state,
      isError: null,
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload.user.userName,
      userFilms: payload.user.films,
      token: payload.token,
      isError: false,
    }));
  },
});
export default usersSlice.reducer;
export const ac = usersSlice.actions;
