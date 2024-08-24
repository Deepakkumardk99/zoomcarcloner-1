import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import Navbar from './components/Navbar';
import BookingDetails from './components/BookingDetails';
import ConfirmationPage from './components/ConfirmationPage';
import AdminPage from './components/Adminpage'
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
