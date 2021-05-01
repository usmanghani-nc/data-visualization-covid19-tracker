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

  const getPoulationData = async () => {
    const { data } = await axios.get('https://restcountries.eu/rest/v2/all');
    return data;
  };

  const getData = async (populations) => {
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
        console.log(err.message, 'ERROR');
      }
    };

    const mapLoop = async () => {
      return Promise.all(
        countries.map(async (con) => {
          const country = await getCountry(con.iso2);
          const [populationData] = populations.filter((pop) => pop.alpha2Code === con.iso2);

          const deathPercent = (
            (country?.deaths?.value / populationData?.population) *
            100
          ).toFixed(3);

          return {
            id: con.iso2,
            name: con.name,
            confirmed: country?.confirmed?.value,
            deaths: country?.deaths?.value,
            recovered: country?.recovered?.value,
            population: populationData?.population,
            deathPercent: parseInt(deathPercent),
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
    getPoulationData().then((pop) => getData(pop));
  }, []);

  return <>{!state.loading ? <ChartMap data={state.data} /> : <h2>Loading...</h2>}</>;
}
