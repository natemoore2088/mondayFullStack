import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const useFragrances = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFragrances = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/fragrances?page=${page}&limit=${limit}`, {
        headers: {
          'X-API-KEY': API_KEY,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch fragrances');
      const data = await response.json();
      console.log(data);
      setFragrances([...data.fragrances]); 
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFragrance = useCallback(async (fragrance) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/fragrances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify(fragrance),
      });
      if (!response.ok) throw new Error('Failed to create fragrance');
      const newFragrance = await response.json();

      setFragrances(prev => [...prev, newFragrance.fragrance]); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFragrance = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/fragrances/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update fragrance');
      const updatedFragrance = await response.json();
      setFragrances(prev => prev.map(f => f._id === id ? {...updatedFragrance.fragrance} : {...f})); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFragrance = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/fragrances/${id}`, {
        method: 'DELETE',
        headers: {
          'X-API-KEY': API_KEY,
        },
      });
      if (!response.ok) throw new Error('Failed to delete fragrance');
      setFragrances(prev => prev.filter(f => f._id !== id).map(f => ({...f})));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFragrances();
  }, [fetchFragrances]);

  return {
    fragrances,
    loading,
    error,
    fetchFragrances,
    createFragrance,
    updateFragrance,
    deleteFragrance,
  };
};

export default useFragrances;