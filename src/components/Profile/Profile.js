// компонент страницы изменения профиля
import './Profile.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';

function Profile({userData}) {

  function handleSubmit(e) {
    e.preventDefault();
  } 

  return (
    <main className='profile'>
      <section className='profile__wrapper'>
        <TitleForm title={`Привет, ${'aaaaaa'}!`} />
        <Form 
          type='profile'
          name='profile'
          onSubmit={handleSubmit}
          buttonName='Редактировать'
          paragrafText=''
          linkText='Выйти из аккаунта'
          route="/signin"
          userData={userData}
        />
      </section>
    </main>
  )
}

export default Profile;