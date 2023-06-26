// компонент страницы авторизации
import './Login.css';
import Form from '../Form/Form';
import TitleForm from '../TitleForm/TitleForm';
import Logo from '../Logo/Logo';

function Login({ user }) {
  function handleSubmit(e) {
    e.preventDefault();
  } 

  return (
    <main className='login'>
      <section className='login__wrapper'>
        <Logo />
        <TitleForm title='Рады видеть!' />
        <Form 
          user={user} 
          type='login'
          name='login'
          onSubmit={handleSubmit}
          buttonName='Войти'
          paragrafText='Ещё не зарегистрированы?'
          linkText='Регистрация'
          route='/signup'
        />
      </section>
    </main>
  )
}

export default Login;