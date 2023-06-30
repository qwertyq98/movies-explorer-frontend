// компонент аккаунта
import './Account.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Account = ({ burger, handleBurger }) => {
  const location = useLocation();
  function onClick () {
    if (burger) {
      handleBurger();
    }
  }

  return (
    <div className={`${ burger ? 'account_burger': 'account' }`}>
      <Link to='/profile' className={
        location.pathname === '/' ? 
        'account__button account__button_white account__button_name':
        'account__button account__button_name'
        }
        onClick={onClick}>
        Аккаунт
      </Link>
      <Link to='/profile' className='account__button account__button_icon' onClick={onClick} />
    </div>
)
}

export default Account;