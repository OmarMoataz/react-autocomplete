import React, { useEffect, useState } from 'react'

const useDebounceTimer = (timer) => {
  const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  });

  const interval = setInterval(() => {
    setShouldTriggerUpdate(true);
  }, timer)
  
  return shouldTriggerUpdate;
}

export default useDebounceTimer
