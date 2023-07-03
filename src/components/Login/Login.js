// компонент страницы авторизации
import './Login.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Logo from '../Logo/Logo';

function Login({serverError, onSubmit, loading}) {

  return (
    <main className='login'>
      <section className='login__wrapper'>
        <Logo />
        <TitleForm title='Рады видеть!' />
        <Form 
          type='login'
          name='login'
          onSubmit={onSubmit}
          buttonName={loading? 'Вход...' : 'Войти'}
          paragrafText='Ещё не зарегистрированы?'
          linkText='Регистрация'
          route='/signup'
          serverError={serverError}
          disabled={loading}
        />
      </section>
    </main>
  )
}

export default Login;