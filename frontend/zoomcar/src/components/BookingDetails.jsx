import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}bookings/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [user.token]);

  if (bookings.length === 0) {
    return <div >No booking details found.
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>;
  }

  return (
        
    <div className="booking-details">
      <div>
        <h2>My booking</h2>
        </div>
      <div className='detailschild'>
      {bookings.map((booking) => (
        <div className="car-item" key={booking._id} >
            <img src={booking.car.imageUrl} alt={booking.car.name} />
            <h3>{booking.car.name}</h3>
            <p>Price per day: ${booking.car.price}</p>
            <p>Rating: {booking.car.rating}</p>
            <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
        
        </div>
      ))}
      </div>
      
     
    </div>
  );
};

export default BookingDetails;
