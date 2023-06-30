// компонент страницы изменения профиля
import './Profile.css';
import React from 'react';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Toast from '../Toast/Toast';

function Profile({currentUser, onSubmit, serverError, signOut, successMessage }) {

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
          buttonName='Coхранить'
          buttonEdit='Редактировать'
          paragrafText=''
          linkText='Выйти из аккаунта'
          route="/signin"
          currentUser={currentUser}
          isEdit={isEdit}
          handleEdit={handleEdit}
          readOnly={readOnly}
          onSubmit={onSubmit}
          serverError={serverError}
          signOut={signOut}
        />
        { successMessage ? <Toast /> : <></>}
      </section>
    </main>
  )
}

export default Profile;