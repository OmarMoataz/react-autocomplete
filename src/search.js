import React, { useEffect, useState } from 'react'
import useUsersSearch from './hooks/useUsersSearch';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, isLoading, isError] = useUsersSearch(query);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <input onChange={handleQueryChange} value={query}/>
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
