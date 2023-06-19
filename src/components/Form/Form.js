// компонент страницы изменения профиля
import './Form.css';
import { Link } from 'react-router-dom';

function Form({ user, type, name, onSubmit, buttonName, paragrafText, linkText, route }) {
  return (
    <form className={`form__name form__name_${name}`} name={type} onSubmit={onSubmit}>
      <div className='form__inputs-wrapper'>
        <label className={`form__label form__label_${name}`}>Имя
          <input 
            className={`form__text form__text_${name}`} 
            type="text" 
            name='text' 
            defaultValue={user.name} 
            required 
          />
        </label>
        <label className={`form__label form__label_${name}`}>E-mail
          <input 
            className={`form__text form__text_${name}`} 
            type="email" 
            name='email' 
            defaultValue={user.email} 
            required 
          />
        </label>
        <label className={`form__label form__label_${name}`}>Пароль
          <input 
            className={`form__text form__text_${name}`} 
            type="password" 
            name='password' 
            defaultValue={user.password} 
            required 
          />
        </label>
      </div>
      <div className='form__buttons-wrapper'>
        <button className={`form__button form__button_${name}`} type="submit">{buttonName}</button>
        <div className='form__wrapper'>
          <p className={`form__wrapper-text form__wrapper-text_${name}`}>{paragrafText}</p>
          <Link to={route} className={`form__link form__link_${name}`}>{linkText}</Link>
        </div>
      </div>
    </form>
  )
}

export default Form;