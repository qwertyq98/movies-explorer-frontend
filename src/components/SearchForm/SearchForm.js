// форма поиска, куда пользователь будет вводить запрос
import React, { useEffect } from 'react'; 
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {useValidationForm} from '../../hooks/useValidationForm';

function SearchForm({ onChangeFilter, initialShortFilms, initialSearchString }) {
  const [searchString, setSearchString] = React.useState(initialSearchString);
  const [isFilter, setIsFilter] = React.useState(initialShortFilms);

  const {onChangeHandler, errors, setErrors} = useValidationForm();

  function handleSubmit(e) {
    const form = e.target;
    const searchInput = form.elements.search;
    const newSearchString = searchInput.value;
    let errorValue = '';

    if (newSearchString === '') {
      errorValue = searchInput.getAttribute('emptytextvalidation');
    }

    e.preventDefault();
    setErrors({...errors, [searchInput.name]: errorValue})
    setSearchString(newSearchString);
  }

  function onChangeCheckBox() {
    setIsFilter(!isFilter);
  }

  useEffect(() => {
    if (searchString !== '') {
      onChangeFilter({
        searchString: searchString,
        shortFilms: isFilter,
      });
    }
  }, [searchString, isFilter]);
 
  return (
      <section className='search-form'>
        <div className='search-form__wrapper'>
          <form 
            action="#" 
            method="get" 
            className='search-form__form' 
            name="search-form" 
            onSubmit={handleSubmit} 
            noValidate
          >
            <input 
              name="search" 
              className='search-form__input' 
              placeholder="Фильм" 
              type="search" 
              onChange={onChangeHandler}
              defaultValue={initialSearchString || ''}
              emptytextvalidation='Нужно ввести ключевое слово'
              required 
            />
            <span className='search-form__error'>{errors.search || ''}</span>
            <button type="submit" className='search-form__button' />
          </form>
          <FilterCheckbox onChangeFilter={onChangeCheckBox} isFilter={isFilter} initialShortFilms={initialShortFilms} />
        </div>
      </section>
  )
}

export default SearchForm;