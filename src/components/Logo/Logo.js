// компонент логотипа
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to='/' className='logo' />
  )
}

export default Logo;