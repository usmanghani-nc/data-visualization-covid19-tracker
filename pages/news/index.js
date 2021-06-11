import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import Spinner from '../../ui/spinner';
import Header from '../../components/header';

export default function Home() {
  const [covidData] = useFetch({ url: `http://localhost:5001/news` });

  const [loading, setLoagin] = useState(true);

  useEffect(() => {
    if (covidData) {
      setLoagin(false);
    }
  }, [covidData]);

  return (
    <div className="max-w-screen-xl mx-auto">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header />

          <div className="flex flex-wrap">
            {covidData.map((el, idx) => {
              return (
                <div key={idx} className="w-1/3 py-4 px-5">
                  <div className="rounded-lg shadow-lg p-4  h-full">
                    <div className="flex flex-col h-full">
                      <p className="text-gray-500 my-1">{el.date ? el.date : '--'}</p>
                      <h3 className="font-semibold text-lg tracking-wide mb-2">{el.title}</h3>

                      <div className="mt-auto">
                        <a
                          href={el.link}
                          className="text-blue-700  inline-flex items-center font-semibold tracking-wide">
                          <span className="hover:underline">Continue Reading</span>
                          <span className="text-xl ml-2">&#8594;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
