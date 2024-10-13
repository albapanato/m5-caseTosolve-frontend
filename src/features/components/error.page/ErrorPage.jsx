import style from './ErrorPage.module.scss';
export default function ErrorPage() {
  return (
    <div className={style.image}>
      <img
        src="/vincent.gif"
        alt="Vincent from Pulp Fiction"
        width="300"
        height="300"
      />
    </div>
  );
}
