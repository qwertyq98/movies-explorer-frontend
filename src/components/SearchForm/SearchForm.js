// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
      <section className='search-form'>
        <div className='search-form__wrapper'>
          <form action="#" method="get" className='search-form__form' name="search-form" onSubmit={handleSubmit}>
            <input name="search" className='search-form__input' placeholder="Фильм" type="search" required />
            <button type="submit" className='search-form__button' />
          </form>
          <FilterCheckbox />
        </div>
      </section>
  )
}

export default SearchForm;