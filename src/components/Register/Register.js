// компонент страницы регистрации
import './Register.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Logo from '../Logo/Logo';

function Register({user}) {
  function handleSubmit(e) {
    e.preventDefault();
  } 

  return (
    <main className='signup'>
      <section className='signup__wrapper'>
        <Logo />
        <TitleForm title='Добро пожаловать!' />
        <Form 
          user={user} 
          type='signup'
          name='signup'
          onSubmit={handleSubmit}
          buttonName='Зарегистрироваться'
          paragrafText='Уже зарегистрированы?'
          linkText='Войти'
          route='/signin'
        />
      </section>
    </main>
  )
}

export default Register;