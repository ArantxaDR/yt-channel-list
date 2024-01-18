import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Button } from '../commons/Button';
const NavBar = () => {
  const isUserSignedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className="bg-primary-dark">
      <nav className="flex justify-between items-center p-1.5 border border-b border-primary-dark">
        <Link to="/login">
          <img src={logo} alt="Enterprise logo" className="w-14 ml-3" />
        </Link>
        <ul className="flex gap-6 text-xl mr-3 list-none">
          {isUserSignedIn ? (
            <>
              <div className='flex items-center justify-center'>
                <Link to="/account">Login</Link>
              <li><Button className='bg-transparent text-secondary-light' onClick={handleSignOut}>Sign Out</Button></li>
              </div>
              
            </>
          ) : (
            <>
              <Link to="/login">
                <li>Login</li>
              </Link>

              <Link to="/signup">
                <li>Sign up</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
