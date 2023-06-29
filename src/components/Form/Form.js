// компонент страницы изменения профиля
import './Form.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useValidationForm } from '../../hooks/useValidationForm';

function Form({ type, name, onSubmit, buttonName, paragrafText, linkText, route, serverError, userData }) {
  const { values, errors, valid, onChangeHandler } = useValidationForm();
  const formRef = React.useRef('');
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form className={`form__name form__name_${name}`} name={type} onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className='form__inputs-wrapper'>
        {location.pathname === '/signup' || location.pathname === '/profile' ? 
          <label className={`form__label form__label_${name}`}>Имя
            <input 
              className={`form__text form__text_${name}`} 
              type="text" 
              name='text' 
              value={values.text || '' || userData?.text}
              onChange={onChangeHandler}
              pattern='^[A-Za-zА-Яа-яЁё\s\-]+$'
              required 
            />
            <span className={`form__error form__error_${name}`}>{errors.text}</span>
          </label> : <></>
        }
        <label className={`form__label form__label_${name}`}>E-mail
          <input 
            className={`form__text form__text_${name}`} 
            type="email" 
            name='email' 
            value={values.email || '' || userData?.email}
            onChange={onChangeHandler}
            required 
          />
          <span className={`form__error form__error_${name}`}>{errors.email}</span>
        </label>
        { location.pathname === '/signin' || location.pathname === '/signup' ? 
          <label className={`form__label form__label_${name}`}>Пароль
            <input 
              className={`form__text form__text_${name} form__text_${name}_red`} 
              type="password" 
              name='password' 
              value={values.password || ''}
              onChange={onChangeHandler}
              autoComplete="on"
              required 
            />
            <span className={`form__error form__error_${name}`}>{errors.password}</span>
          </label> : <></>
        }
      </div>
      <div className='form__buttons-wrapper'>
        <span className='form__server-error'>{serverError}</span>
        <button 
          className={valid ? 
          `form__button form__button_${name}` : 
          `form__button form__button_${name} form__button_disable`} 
          type="submit" 
          disabled={!valid}
        >{buttonName}</button>
        <div className='form__wrapper'>
          <p className={`form__wrapper-text form__wrapper-text_${name}`}>{paragrafText}</p>
          <Link to={route} className={`form__link form__link_${name}`}>{linkText}</Link>
        </div>
      </div>
    </form>
  )
}

export default Form;