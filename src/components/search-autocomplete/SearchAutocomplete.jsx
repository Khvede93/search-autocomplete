import React, { useEffect, useState } from 'react';
import './styles.css';
import { Suggestions } from './Suggestions';

export const SearchAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(e) {
    const query = e.target.value.toLowerCase();
    setSearchParams(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((user) => user.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropDown(true);
    } else {
      setFilteredUsers([]);
      setShowDropDown(false);
    }
  }

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Something Went Wrong');
      }
      const data = await response.json();

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((user) => user.firstName));
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

  console.log(users, filteredUsers, showDropDown);

  return (
    <div className='container'>
      <input
        type='text'
        name='search-users'
        placeholder='Search Users ...'
        value={searchParams}
        onChange={handleChange}
      />
      {showDropDown && <Suggestions data={filteredUsers} />}
    </div>
  );
};
