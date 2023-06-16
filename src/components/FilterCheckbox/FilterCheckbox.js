// 
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      Короткометражки
      <input type="checkbox" className='filter-checkbox__input' name="toggle" id="toggle" />
      <span className="filter-checkbox__display"></span>
    </label>
  )
}

export default FilterCheckbox;