import { useState, useEffect } from 'react';
import API_BASE_URL from '../utils/BaseUrl.tsx';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State för valt fordon

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}vehicle`, {
          credentials: 'include', // Lägg till credentials här om nödvändigt
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicles(data.vehicles); // Anpassa för att hämta vehicles-arrayen
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="content-container">
      <h2>Vehicles</h2>
      {selectedVehicle ? (
        <div>
          <h3>Vehicle Details</h3>
          <p>
            <strong>Registration Tag:</strong> {selectedVehicle.regTag}
          </p>
          <p>
            <strong>Vehicle Type:</strong> {selectedVehicle.vehicleType}
          </p>
          <p>
            <strong>Vehicle Status:</strong> {selectedVehicle.vehicleStatus}
          </p>
          <p>
            <strong>Image URL:</strong>{' '}
            <a href={selectedVehicle.imageURL} target="_blank" rel="noopener noreferrer">
              {selectedVehicle.imageURL}
            </a>
          </p>
          <p>
            <strong>Comment:</strong> {selectedVehicle.comment}
          </p>
          <p>
            <strong>Location ID:</strong> {selectedVehicle.locationId}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(selectedVehicle.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(selectedVehicle.updatedAt).toLocaleString()}
          </p>
          <button onClick={() => setSelectedVehicle(null)}>Back to list</button>
        </div>
      ) : (
        <div>
          {vehicles.length > 0 ? (
            <ul>
              {vehicles.map((vehicle) => (
                <li key={vehicle.id}>
                  <button onClick={() => handleVehicleClick(vehicle)}>{vehicle.regTag}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No vehicles found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Vehicles;
