import React, { useEffect, useState } from 'react';
import './styles.css';

export const SearchAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }
      const data = await response.json();

      if (data && data.users && data.users.length) {
        setUsers(
          data.users.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
          }))
        );
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <input
        type='text'
        name='search-users'
        placeholder='Search Users ...'
        value={searchParams}
      />
    </div>
  );
};
