// компонент страницы регистрации
import './Register.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Logo from '../Logo/Logo';

function Register({onSubmit, serverError}) {
  
  return (
    <main className='signup'>
      <section className='signup__wrapper'>
        <Logo />
        <TitleForm title='Добро пожаловать!' />
        <Form 
          type='signup'
          name='signup'
          onSubmit={onSubmit}
          buttonName='Зарегистрироваться'
          paragrafText='Уже зарегистрированы?'
          linkText='Войти'
          route='/signin'
          serverError={serverError}
        />
      </section>
    </main>
  )
}

export default Register;