// компонент страницы изменения профиля
import './Profile.css';
import React, {useContext} from 'react';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Toast from '../Toast/Toast';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({ onSubmit, serverError, signOut, successMessage, loading }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(true);
  const [readOnly, setReadOnly] = React.useState(true);

  function handleEdit() {
    setIsEdit(!isEdit);
    setReadOnly(!readOnly);
  }

  return (
    <main className='profile'>
      <section className='profile__wrapper'>
        <TitleForm title={`Привет, ${currentUser?.name}!`} />
        <Form 
          type='profile'
          name='profile'
          buttonName={loading? 'Сохранение...' : 'Coхранить'}
          buttonEdit='Редактировать'
          paragrafText=''
          linkText='Выйти из аккаунта'
          route="/signin"
          isEdit={isEdit}
          handleEdit={handleEdit}
          readOnly={readOnly}
          onSubmit={onSubmit}
          serverError={serverError}
          signOut={signOut}
          disabled={loading}
        />
        { successMessage ? <Toast /> : <></>}
      </section>
    </main>
  )
}

export default Profile;