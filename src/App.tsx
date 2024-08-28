import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null); // Håll koll på användarens ID

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/auth/verify', {
          method: 'GET',
          credentials: 'include', // Inkludera cookies med begäran
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserId(data.id); // Antag att servern returnerar användarens ID
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Verification failed:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const handleLogout = async () => {
    if (userId === null) {
      console.error('No user ID available for logout');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/v1/auth/signout/${userId}`, {
        method: 'POST',
        credentials: 'include', // Inkludera cookies med begäran
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUserId(null); // Rensa användarens ID
        localStorage.removeItem('token'); // Rensa token om den finns i localStorage
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Hantera en laddningstillstånd om nödvändigt
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <nav className="meny-container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/vehicles">Vehicles</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
