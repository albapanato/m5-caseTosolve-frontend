import { useFilms } from '../../hooks/use.films';
import style from './FilterFilms.module.scss';
export function FilterFilms() {
  const { handleLoadFiltered, handleLoadFilms, handlePaging, next, previous } =
    useFilms();
  const handleFilter = (event) => {
    const element = event.target;
    if (element.name === 'genre') {
      const filter = `genre=${element.value}`;
      handleLoadFiltered(filter);
    }
  };
  const handleLoadNext = () => {
    const url = next;
    console.log(url, 'url aqui');
    if (!url) return;
    handlePaging(url);
  };
  const handleLoadPrevious = () => {
    const url = previous;
    if (!url) return;
    handlePaging(url);
  };
  return (
    <section className={style.filter}>
      <div className={style.filterControllers}>
        <div>
          <button onClick={handleLoadFilms}>Show All</button>
        </div>
        <div className={style.paging}>
          <section className={style.controllers}>
            <div>
              {previous ? (
                <button onClick={handleLoadPrevious}>&#60;</button>
              ) : (
                <button
                  onClick={handleLoadPrevious}
                  disabled
                  className={style.disabled}
                >
                  &#60;
                </button>
              )}
            </div>
            <div>
              {next ? (
                <button onClick={handleLoadNext}>&#62;</button>
              ) : (
                <button
                  onClick={handleLoadNext}
                  disabled
                  className={style.disabled}
                >
                  &#62;
                </button>
              )}
            </div>
          </section>
        </div>

        <select name="genre" id="genre" onChange={handleFilter}>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Animation">Animation</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
    </section>
  );
}
