// компонент аккаунта
import './Account.css';
import { Link } from 'react-router-dom';

const Account = ({ isBurgerMenu }) => {
  return (
    <div className={`${ isBurgerMenu ? 'account_burger': 'account' }`}>
      <Link to='/profile' className='account__button account__button_name'>
        Аккаунт
      </Link>
      <Link to='/profile' className='account__button account__button_icon' />
    </div>
)
}

export default Account;