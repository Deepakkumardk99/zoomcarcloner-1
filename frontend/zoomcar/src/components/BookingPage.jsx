import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { car } = state || {};

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24) + 1; // Adding 1 to include both start and end days
      setTotalPrice(car.price * days);
    }
  }, [startDate, endDate, car.price]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // Reset the end date if it is earlier than the new start date
    if (endDate && new Date(selectedStartDate) > new Date(endDate)) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleProceedToConfirmation = () => {
    navigate('/confirmation', {
      state: {
        car,
        startDate,
        endDate,
        totalPrice,
      },
    });
  };

  if (!car) {
    return <div>No car selected for booking</div>;
  }

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="booking-page">
      <h1>Book {car.name}</h1>
      <img src={car.imageUrl} alt={car.name} />
      <p>Price per day: ${car.price}</p>
      <p>Rating: {car.rating}</p>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          min={today} // Prevent selecting past dates
          onChange={handleStartDateChange}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          min={startDate || today} // Prevent selecting an end date before the start date
          onChange={handleEndDateChange}
        />
      </label>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button 
        onClick={handleProceedToConfirmation}
        disabled={!startDate || !endDate} // Disable button if dates are not selected
      >
        Proceed to Confirmation
      </button>
    </div>
  );
};

export default BookingPage;
