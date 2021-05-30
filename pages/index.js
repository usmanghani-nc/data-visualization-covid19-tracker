import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState, useEffect } from 'react';
import { AgGridColumn } from 'ag-grid-react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Table from '../components/table';
import moment from 'moment';
import Spinner from './../ui/spinner';
import Link from 'next/link';
const BarChart = dynamic(() => import('../components/charts/bar-chart'), { ssr: false });
const Chart = dynamic(() => import('../components/charts'), { ssr: false });

axios.defaults.baseURL = 'https://covid19.mathdro.id/api/';

export default function Home() {
  const cn = typeof window !== 'undefined' && localStorage.getItem('cn');

  const [state, setState] = useState({
    loading: true,
    location: cn ? cn : 'USA',
    data: [],
    countries: [],
    lastUpdate: '',
    chartFilter: null,
  });

  const getData = async () => {
    setState({
      ...state,
      loading: true,
    });

    const {
      data: { countries },
    } = await axios.get(`/countries`);

    const responce = await axios.get(`https://covid19.mathdro.id/api/`);

    const { data } = await axios.get(`/countries/${state.location}/confirmed`);

    const date = moment(responce.data.lastUpdate).format('YYYY/MM/DD hh:mm:ss a');

    setState({
      ...state,
      loading: false,
      data,
      chartFilter: data,
      lastUpdate: date,
      countries,
    });
  };

  useEffect(() => {
    getData();
  }, [state.location]);

  const handleChange = (e) => {
    localStorage.setItem('cn', e.target.value);
    setState({ ...state, location: e.target.value });
  };

  const selectedData = (id) => {
    setState({
      ...state,
      chartFilter: state.data.filter((el) => el.uid === id),
    });
  };

  const getAllData = () => {
    setState({
      ...state,
      chartFilter: state.data,
    });
  };

  console.log(state.chartFilter, '??');

  return (
    <div className="max-w-screen-xl mx-auto">
      {state.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="my-2 flex justify-between">
            <h2 className="my-2">Last Update - {state.lastUpdate}</h2>

            <div>
              <label className="mr-2" htmlFor="Countrys">
                Choose a Country:
              </label>

              <select
                className="border border-blue-400 rounded p-1"
                name="Countrys"
                onChange={handleChange}
                value={state.location}>
                {state.countries.map((countrie) => {
                  return (
                    <option key={countrie.name} value={countrie.iso3}>
                      {countrie.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="">
              <Link href="/map">
                <a className="text-blue-400 hover:text-blue-500">World map</a>
              </Link>
            </div>
          </div>

          <Table data={state.data} onDataChange={selectedData} getAllData={getAllData}>
            <AgGridColumn field="provinceState" sortable={true} filter flex={1} />
            <AgGridColumn field="confirmed" sortable={true} filter flex={1} />
            <AgGridColumn field="active" sortable={true} filter flex={1} />
            <AgGridColumn field="deaths" sortable={true} filter flex={1} />
            <AgGridColumn field="recovered" sortable={true} filter flex={1} />
          </Table>

          <div className="my-5" style={{ marginTop: '7em' }}>
            {/* <h2>Province / Capital territory</h2> */}
            {/* <Chart data={state.chartFilter} /> */}

            <BarChart data={state.chartFilter} title="Province / Capital territory" />
          </div>
        </>
      )}
    </div>
  );
}
