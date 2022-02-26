import React, { useEffect, useState, useRef } from 'react'
import useUsersSearch from './hooks/useUsersSearch';

const Search = () => {
  const [query, setQuery] = useState('');
  const [delayedQuery, setDelayedQuery] = useState(query);
  const [users, isLoading, isError] = useUsersSearch(delayedQuery);

  const searchTimeout = useRef(null);

  const handleQueryChange = (query) => {
    setQuery(query);
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setDelayedQuery(query);
    }, 300);
  }

  return (
    <>
      <input onChange={(e) => handleQueryChange(e.target.value)} value={query}/>
      {isLoading && <div> Loading... </div>}
      {users && <ul style={{ padding: '0', listStyleType: 'none' }}>
        {users.map(user => (
          <li key={user.id}> {user.name} </li> 
        ))}
      </ul>
      }
    </>
  )
}

export default Search;
