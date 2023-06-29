// компонент страницы авторизации
import './Login.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Logo from '../Logo/Logo';

function Login({serverError, onSubmit}) {

  return (
    <main className='login'>
      <section className='login__wrapper'>
        <Logo />
        <TitleForm title='Рады видеть!' />
        <Form 
          type='login'
          name='login'
          onSubmit={onSubmit}
          buttonName='Войти'
          paragrafText='Ещё не зарегистрированы?'
          linkText='Регистрация'
          route='/signup'
          serverError={serverError}
        />
      </section>
    </main>
  )
}

export default Login;