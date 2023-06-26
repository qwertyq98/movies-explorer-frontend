// компонент страницы изменения профиля
import './Profile.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';

function Profile({ user }) {

  function handleSubmit(e) {
    e.preventDefault();
  } 

  return (
    <main className='profile'>
      <section className='profile__wrapper'>
        <TitleForm title={`Привет, ${user.name}!`} />
        <Form 
          user={user} 
          type='profile'
          name='profile'
          onSubmit={handleSubmit}
          buttonName='Редактировать'
          paragrafText=''
          linkText='Выйти из аккаунта'
          route="/signin"
        />
      </section>
    </main>
  )
}

export default Profile;