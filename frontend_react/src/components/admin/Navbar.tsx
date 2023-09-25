import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuthenticationContext } from '../../context/AuthenticationContext';
import { useTokenContext } from '../../context/TokenContext';

function Navbar() {
  const history = useHistory();
  const authenticationContext = useAuthenticationContext();
  const tokenContext = useTokenContext();
  const location = useLocation();

  const isActiveLink = (path) => {
    console.log(path);
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => {
    authenticationContext.setIsAuthenticated(false);
    tokenContext.setToken('');
    history.push('/login');
  };

  return (
    <nav className="bg-green-500 p-4">
      <ul className="flex space-x-4 items-center">
        {!tokenContext.token && (
          <li>
            <Link
              to="/login"
              className={`${
                isActiveLink('/login') ? 'text-black' : 'text-white'
              } hover:text-black text-lg font-semibold`}
            >
              Login
            </Link>
          </li>
        )}
        {authenticationContext.isAuthenticated && (
          <>
            <li>
              <Link
                to="/landing"
                className={`${
                  isActiveLink('/landing') ? 'text-black' : 'text-white'
                } hover:text-black text-lg font-semibold`}
              >
                Landing Page
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`${
                  isActiveLink('/dashboard') ? 'text-black' : 'text-white'
                } hover:text-black text-lg font-semibold`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-black text-lg font-semibold"
              >
                Sign Out
              </button>
            </li>
          </>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
