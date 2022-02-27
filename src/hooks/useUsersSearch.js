import { useEffect, useState } from 'react';

const useUsersSearch = (query) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      const rawData = await fetch(`http://localhost:3000/users?q=${query}`);
      const userData = await rawData.json();
      
      setData(userData);
      setIsLoading(false);
    }

    getUsers();
  }, [query]);
  
  return [data, isLoading];
}

export default useUsersSearch;
