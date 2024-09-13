import { Link } from 'react-router-dom';

const CarList = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <div key={car._id} className="car-item">
          <img src={car.imageUrl} alt={car.name} />
          <h3>{car.name}</h3>
          <p>Price: ${car.price}</p>
          <p>Rating: {car.rating} Stars</p>
          
          <Link to={`/booking?carId=${car._id}`}>Book Now</Link>
        </div>
      ))}
    </div>
  );
};

export default CarList;
