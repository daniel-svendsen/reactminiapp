import { useState, useEffect } from 'react';
import API_BASE_URL from '../utils/BaseUrl.tsx';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State för vald kund

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}customer`, {
          credentials: 'include', // Lägg till credentials här
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data.customers); // Anpassa för att hämta customers-arrayen
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="content-container">
      <h2>Customers</h2>
      {selectedCustomer ? (
        <div>
          <h3>Customer Details</h3>
          <p>
            <strong>First Name:</strong> {selectedCustomer.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {selectedCustomer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {selectedCustomer.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {selectedCustomer.phoneNumber}
          </p>
          <p>
            <strong>Personal Identity Number:</strong> {selectedCustomer.personalIdentityNumber}
          </p>
          <p>
            <strong>Organization Name:</strong> {selectedCustomer.organizationName}
          </p>
          <p>
            <strong>Comment:</strong> {selectedCustomer.comment}
          </p>
          <button onClick={() => setSelectedCustomer(null)}>Back to list</button>
        </div>
      ) : (
        <div>
          {customers.length > 0 ? (
            <ul>
              {customers.map((customer) => (
                <li key={customer.id}>
                  <button onClick={() => handleCustomerClick(customer)}>
                    {customer.firstName} {customer.lastName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Customers;
