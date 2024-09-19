import React, { useEffect, useState } from 'react';
import './styles.css';

export const SearchAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  async function fetchUsers() {
    try {
    } catch (error) {
      setError(error);
    } finally {
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <input type='text' name='search-users' placeholder='Search Users ...' />
    </div>
  );
};
