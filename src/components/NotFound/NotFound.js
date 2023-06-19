import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  
  function handleBtnBackClick() {
    if(window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/signin", { replace: true });
    }
  }

  return (
    <main className="not-found">
      <section className="not-found__wrapper">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button
          className="not-found__button"
          type="button"
          onClick={handleBtnBackClick}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;