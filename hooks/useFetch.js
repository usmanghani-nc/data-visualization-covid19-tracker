import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch({ url }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responce = await axios.get(url);
      setData(responce.data);
    };

    fetchData();
  }, []);

  return [data];
}
