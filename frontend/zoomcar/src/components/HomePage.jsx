import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    price: 'all',
    rating: 'all',
    fuelType: 'all',
    seatType: 'all',
    carType: 'all',
    transmission: 'all',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!user || !user.token) {
          throw new Error('User is not authenticated');
        }

        const response = await axios.get('http://localhost:5000/api/cars', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars', error);
        setError(error);

        if (error.message === 'User is not authenticated') {
          navigate('/login');
        }
      }
    };

    fetchCars();
  }, [user, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...cars];

      if (filters.price !== 'all') {
        filtered = filtered.filter(car => {
          if (filters.price === 'low') return car.price <= 50;
          if (filters.price === 'high') return car.price > 50;
          return true;
        });
      }

      if (filters.rating !== 'all') {
        filtered = filtered.filter(car => car.rating === parseInt(filters.rating));
      }

      if (filters.fuelType !== 'all') {
        filtered = filtered.filter(car => car.fuelType === filters.fuelType);
      }

      if (filters.seatType !== 'all') {
        filtered = filtered.filter(car => car.seatType === parseInt(filters.seatType));
      }

      if (filters.carType !== 'all') {
        filtered = filtered.filter(car => car.carType === filters.carType);
      }

      if (filters.transmission !== 'all') {
        filtered = filtered.filter(car => car.transmission === filters.transmission);
      }

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [filters, cars]);

  const handleBookNow = (car) => {
    navigate(`/booking/${car._id}`, { state: { car } });
  };

  if (error) {
    return <div>Error fetching cars: {error.message}</div>;
  }

  return (
      <div className="home-page">
         
      <div className="filters">
        <select name="price" onChange={handleFilterChange}>
          <option value="all">Price: All</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
        <select name="rating" onChange={handleFilterChange}>
          <option value="all">Rating: All</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <select name="fuelType" onChange={handleFilterChange}>
          <option value="all">Fuel Type: All</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="cng">CNG</option>
          <option value="electric">Electric</option>
        </select>
        <select name="seatType" onChange={handleFilterChange}>
          <option value="all">Seat Type: All</option>
          <option value="4">4 Seater</option>
          <option value="5">5 Seater</option>
          <option value="6">6 Seater</option>
        </select>
        <select name="carType" onChange={handleFilterChange}>
          <option value="all">Car Type: All</option>
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="hatchback">Hatchback</option>
        </select>
        <select name="transmission" onChange={handleFilterChange}>
          <option value="all">Transmission: All</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>
      <div className="car-list">
        {filteredCars.map(car => (
          <div key={car._id} className="car-item">
            <img src={car.imageUrl} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Price:${car.price}</p>
            <p>Rating: {car.rating}</p>
            <button onClick={() => handleBookNow(car)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
