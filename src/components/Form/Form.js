// компонент страницы изменения профиля
import './Form.css';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useValidationForm } from '../../hooks/useValidationForm';

function Form({ 
  type, 
  name, 
  onSubmit, 
  buttonName, 
  paragrafText, 
  linkText, 
  route, 
  serverError, 
  currentUser, 
  buttonEdit, 
  isEdit, 
  handleEdit, 
  readOnly,
  signOut
  }) {
  const { values, errors, valid, onChangeHandler, onSubmitHandler } = useValidationForm();
  const formRef = React.useRef('');
  const [disabled, setDisabled] = React.useState(true);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/profile') {
      const profileIsChanged = (
        (values.email !== undefined && values.email !== currentUser.email) ||
        (values.text !== undefined && values.text !== currentUser.name)
      )

      setDisabled(!valid || !profileIsChanged);
    } else {
      setDisabled(!valid);
    }
  }, [values, valid]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitHandler(e);
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
              defaultValue={values.text || '' || currentUser?.name}
              onChange={onChangeHandler}
              pattern='^[A-Za-zА-Яа-яЁё\s\-]+$'
              readOnly={readOnly}
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
            defaultValue={values.email || '' || currentUser?.email}
            onChange={onChangeHandler}
            readOnly={readOnly}
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
              defaultValue={values.password || ''}
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
        {location.pathname === '/profile' && isEdit ? 
          <>
            <button className='form__edit' onClick={handleEdit}>{buttonEdit}</button>
          </> : <></>
        }
        {!isEdit ? 
          <button 
            className={!disabled ? 
            `form__button form__button_${name}` : 
            `form__button form__button_${name} form__button_disable`} 
            type="submit" 
            disabled={disabled}
          >{buttonName}</button> :
          <></>
        } 
        {<div className='form__wrapper'>
          <p className={`form__wrapper-text form__wrapper-text_${name}`}>{paragrafText}</p>
          {(!isEdit  && location.pathname !== '/profile') || (isEdit && location.pathname === '/profile') ? 
            <Link to={route} className={`form__link form__link_${name}`} onClick={signOut}>{linkText}</Link> : <></>
          }
        </div>}
      </div>
    </form>
  )
}

export default Form;