import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';


const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    
    <nav className='navbar'>
          <h1>Zoomcar</h1>
          
      {user ? (
        <div className='navbar-item'>
          
          <span >{user.name}</span>
          
          <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
      
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  onClick={() => navigate('/bookings/users')}>my booking</Dropdown.Item>
        <Dropdown.Item onClick={()=>navigate('/admin')}>Admin page</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
                              
          <button className='button 'onClick={logout}  >Logout</button>
        </div>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
