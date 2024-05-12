// useLoading.js
import { useState } from 'react';

const useLoading = () => {
  const [isLoadig, setIsLoading] = useState(false);

  const openLoading = () => {
    setIsLoading(true);
  };

  const closeLoading = () => {
    setIsLoading(false)
  };

  return {
    isLoadig,
    openLoading,
    closeLoading
  };
};

export default useLoading;
