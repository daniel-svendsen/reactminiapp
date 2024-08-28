// src/utils/authUtils.ts
import API_BASE_URL from './BaseUrl.tsx';

// Funktion för att logga in
export const login = async (username: string, password: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Login failed');
  }
};

// Funktion för att logga ut
export const logout = async (userId: number | null): Promise<void> => {
  if (userId === null) {
    throw new Error('No user ID available for logout');
  }

  const response = await fetch(`${API_BASE_URL}auth/signout/${userId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

// Funktion för att verifiera användaren
export const verifyUser = async (): Promise<{ id: number } | null> => {
  const response = await fetch(`${API_BASE_URL}auth/verify`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
};
