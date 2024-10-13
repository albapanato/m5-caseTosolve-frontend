import { Link } from 'react-router-dom';
export function FilmCard({ item }) {
  return (
    <li key={item.id}>
      <Link to={'/detail/' + item.id}>
        <img src={item.poster.url} alt={item.title} width="150" height="250" />
        <span>{item.title}</span>
      </Link>
    </li>
  );
}
