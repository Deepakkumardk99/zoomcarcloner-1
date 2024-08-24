import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: '',
    imageUrl: '',
    carType: '',
    fuelType: '',
    transmission: '',
    seatType: '',
    price: '',
    rating: ''
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    
    }
  };

  const handleAddCar = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cars', newCar, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCars([...cars, response.data]);
      setNewCar({ name: '', imageUrl: '', carType: '', fuelType: '', transmission: '', seatType: '', price: '', rating: '' });
    } catch (error) {
      console.error('Error adding car:', error);
      alert('you are not a admin')
    }
  };

  

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('you are not a admin')
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>

      <div className="add-car-form">
        <h2>Add a New Car</h2>
        <input type="text" placeholder="Car Name" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newCar.imageUrl} onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })} />
        <input type="text" placeholder="Car Type" value={newCar.carType} onChange={(e) => setNewCar({ ...newCar, carType: e.target.value })} />
        <input type="text" placeholder="Fuel Type" value={newCar.fuelType} onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })} />
        <input type="text" placeholder="Transmission" value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })} />
        <input type="text" placeholder="Seat Type" value={newCar.seatType} onChange={(e) => setNewCar({ ...newCar, seatType: e.target.value })} />
        <input type="number" placeholder="Price" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} />
        <input type="number" placeholder="Rating" value={newCar.rating} onChange={(e) => setNewCar({ ...newCar, rating: e.target.value })} />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      <div className="car-list">
        <h2>Manage Cars</h2>
        {cars.map(car => (
          <div key={car._id} >
            <img src={car.imageUrl} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Car Type: {car.carType}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Seat Type: {car.seatType}</p>
            <p>Price: ${car.price}</p>
            <p>Rating: {car.rating}</p>
            <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
