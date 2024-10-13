import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  films: [],
  count: 0,
  next: null,
  previous: null,
};
export const loadFilmsAsync = createAsyncThunk(
  'films/load',
  async ({ repo, url, genre }) => {
    const response = await repo.getAll(url, genre);
    return response;
  },
);
export const createFilmAsync = createAsyncThunk(
  'films/create',
  async ({ repo, film }) => {
    return await repo.create(film);
  },
);
export const updateFilmAsync = createAsyncThunk(
  'films/update',
  async ({ repo, id, film }) => {
    return await repo.update(id, film);
  },
);
export const deleteFilmAsync = createAsyncThunk(
  'films/delete',
  async ({ repo, id }) => {
    const response = await repo.delete(id);
    return response ? id : '';
  },
);
const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadFilmsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: payload.items,
      count: payload.count,
      next: payload.next,
      previous: payload.previous,
    }));
    builder.addCase(createFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: [...state.films, payload],
    }));
    builder.addCase(updateFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: state.films.map((item) =>
        item.id === payload.id ? payload : item,
      ),
    }));
    builder.addCase(deleteFilmAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: state.films.filter((item) => item.id !== payload),
    }));
  },
});
export default filmsSlice.reducer;
