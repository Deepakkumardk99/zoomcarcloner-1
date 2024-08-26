import { Routes, Route,Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import NavBar from './components/Navbar';
import BookingDetails from './components/BookingDetails';
import ConfirmationPage from './components/ConfirmationPage';
import AdminPage from './components/Adminpage'
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>

      <div>
       <div>
          <Link to='/'></Link>
          <Link to='/register'> </Link>
          <Link to='/home'> </Link>
          <Link to='/booking/:carId'> </Link>
          <Link to='/bookings/users'></Link>
          <Link to='/confirmation'> </Link>
          <Link to='/admin'></Link>

        </div>
       <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/booking/:carId" element={<BookingPage />} />
        <Route path="/bookings/users" element={<BookingDetails />} /> 
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
      <Footer/>



      </div>
      
    </>
  );
}

export default App;
