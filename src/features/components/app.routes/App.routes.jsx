import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const Register = lazy(() => import('../register/Register'));
const Login = lazy(() => import('../login/Login'));
const List = lazy(() => import('../list/List'));
const Home = lazy(() => import('../home/Home'));
const FilmDetail = lazy(() => import('../film.detail/FilmDetail'));
const ErrorPage = lazy(() => import('../error.page/ErrorPage'));
const CreateOrEditFilm = lazy(() =>
  import('../create.edit.film/CreateOrEditFilm')
);
const UserFilms = lazy(() => import('../user.films/UserFilms'));
export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/list" element={<List></List>}></Route>
        <Route path="/detail/:id" element={<FilmDetail></FilmDetail>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/create"
          element={<CreateOrEditFilm></CreateOrEditFilm>}
        ></Route>
        <Route
          path="/update/:id"
          element={<CreateOrEditFilm></CreateOrEditFilm>}
        ></Route>
        <Route path="/myfilms" element={<UserFilms></UserFilms>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
