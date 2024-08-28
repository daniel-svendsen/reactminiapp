// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/AuthUtils.tsx';
import '../css/App.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      onLoginSuccess();
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
