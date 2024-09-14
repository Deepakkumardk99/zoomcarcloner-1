import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login`, {
        email,
        password,
      });
      
      login(response.data);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className='login-page'>
      <div className="loginChild">
        <img src="image.jpg" />
      </div>
      <div className="loginChild">
        <form className="login" onSubmit={handleSubmit}>
         <h2>Sign in</h2>
        
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
          />
          
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button  className='button'type="submit">Login</button>
      <p >
        New here? <a style={{color:'blue'}} onClick={()=>navigate('/register')} >Sign Up</a>
      </p>
    </form>
      </div>
      
      

    </div>
  );
};

export default Login;
