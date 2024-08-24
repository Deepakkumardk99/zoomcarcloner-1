import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className='navbar'>
          <h1>Zoomcar</h1>
          
      {user ? (
        <div className='navbar-item'>
          
          <span onClick={()=>navigate('/admin')}>{user.name}</span>
          <button onClick={()=>navigate('/bookings/users')}>my bookings</button>
          <button className='button 'onClick={logout}  >Logout</button>
        </div>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
