import { useState, useEffect } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import axios from 'axios';
const ChartMap = dynamic(() => import('../components/map'), { ssr: false });

axios.defaults.baseURL = 'https://covid19.mathdro.id/api/';

export default function Map({}) {
  const [state, setState] = useState({
    loading: true,
    data: [],
    countries: '',
  });

  const getData = async () => {
    setState({
      ...state,
      loading: true,
    });

    const {
      data: { countries },
    } = await axios.get(`/countries`);

    const getCountry = async (country) => {
      if (!country) return;

      try {
        const { data } = await axios.get(`/countries/${country}`);

        return data;
      } catch (err) {
        console.log(err, 'ERROR');
      }
    };

    const mapLoop = async () => {
      return Promise.all(
        countries.map(async (con) => {
          const country = await getCountry(con.iso2);

          return {
            id: con.iso2,
            name: con.name,
            confirmed: country?.confirmed?.value,
            deaths: country?.deaths?.value,
            recovered: country?.recovered?.value,
            lastUpdate: moment(country?.lastUpdate).format('YYYY/MM/DD hh:mm:ss a'),
          };
        }),
      );
    };

    setState({
      ...state,
      loading: false,
      data: mapLoop(),
      countries,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <ChartMap data={state.data} />;
}
