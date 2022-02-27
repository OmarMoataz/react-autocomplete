import React, { useState, useRef } from 'react'
import useUsersSearch from './hooks/useUsersSearch';

const Search = () => {
  const [query, setQuery] = useState('');
  const [delayedQuery, setDelayedQuery] = useState(query);
  const [users, isLoading] = useUsersSearch(delayedQuery);
  const typingBackupTimeoutToGetLastCall = useRef(null);
  const timeOfLastAPICall = useRef(null);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);

    let currentTime = Date.now();

    if (typingBackupTimeoutToGetLastCall.current) clearTimeout(typingBackupTimeoutToGetLastCall.current);
    
    if (!timeOfLastAPICall.current || currentTime - timeOfLastAPICall.current >= 300) {
      setDelayedQuery(newQuery);
      timeOfLastAPICall.current = currentTime;
    } else {
      typingBackupTimeoutToGetLastCall.current = setTimeout(() => {
        setDelayedQuery(newQuery);
      }, 300);
    }
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
