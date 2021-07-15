// import { useFetch } from '../../hooks/useFetch';
import Link from 'next/link';

export default function Test({}) {
  // const [data] = useFetch({ url: `https://covid19.mathdro.id/api/` });

  // return <div className="flex">{<h1>Deaths : {data.deaths?.value}</h1>}</div>;

  return (
    <>
      <Link href="/test/test1">
        <a>home</a>
      </Link>
    </>
  );
}
