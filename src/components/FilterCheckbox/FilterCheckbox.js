// 
import './FilterCheckbox.css';

function FilterCheckbox({onChangeFilter, isFilter}) {
  return (
    <label className="filter-checkbox">
      Короткометражки
      <input 
        type="checkbox" 
        className='filter-checkbox__input' 
        name="toggle" 
        id="toggle" 
        checked={isFilter} 
        onChange={onChangeFilter} 
        defaultValue={''}
      />
      <span className="filter-checkbox__display"></span>
    </label>
  )
}

export default FilterCheckbox;