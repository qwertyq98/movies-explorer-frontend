// компонент аккаунта
import './Account.css';
import { Link } from 'react-router-dom';

const Account = ({ burger, handleBurger }) => {
  function onClick () {
    if (burger) {
      handleBurger();
  }
  }

  return (
    <div className={`${ burger ? 'account_burger': 'account' }`}>
      <Link to='/profile' className='account__button account__button_name' onClick={onClick}>
        Аккаунт
      </Link>
      <Link to='/profile' className='account__button account__button_icon' onClick={onClick} />
    </div>
)
}

export default Account;