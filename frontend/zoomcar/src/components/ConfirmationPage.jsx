import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Extract booking details from state
  const { car, startDate, endDate, totalPrice } = state || {};

  const handleSaveBooking = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}bookings`, {
        carId: car._id,
        startDate,
        endDate,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 201) {
        navigate('/bookings/users'); // Navigate to the bookings page
      }
    } catch (error) {
      console.error('Failed to save booking', error);
      alert('please login first')
    }
  };

  if (!car) {
    return <div>No booking details available</div>;
  }

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>
      <div className="confirmation-details">
        <div className="car-details">
          <img src={car.imageUrl} alt={car.name} />
          <h3>{car.name}</h3>
          <p>Price per day: ${car.price}</p>
          <p>Rating: {car.rating}</p>
        </div>
        <div className="booking-summary">
          <p><strong>Start Date:</strong> {startDate}</p>
          <p><strong>End Date:</strong> {endDate}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
        <button onClick={handleSaveBooking}> pay now </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
