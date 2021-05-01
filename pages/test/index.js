import axios from 'axios';
import { useEffect } from 'react';

export default function index() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://restcountries.eu/rest/v2/all');

      console.log(data, 'data');
    };

    getData();
  }, []);

  return <></>;
}
