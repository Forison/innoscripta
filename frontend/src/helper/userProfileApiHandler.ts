import { getCookie } from './tokenHandler'

export const fetchUserData = async (
  method: 'GET' | 'POST',
  url: string,
  payload?: object
) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie()}`,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (method === 'POST' && payload) {
      options.body = JSON.stringify(payload);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
