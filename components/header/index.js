import Link from 'next/link';

export default function Header({}) {
  return (
    <header className="bg-indigo-100 mb-6">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          <div className="">
            <Link href="/">
              <a className="text-3xl font-bold text-yellow-500  hover:text-yellow-400">COVIDA</a>
            </Link>
          </div>

          <div className="flex">
            <div className="mr-3">
              <Link href="/news">
                <a className="text-blue-400 hover:text-blue-500">News</a>
              </Link>
            </div>

            <div className="">
              <Link href="/map">
                <a className="text-blue-400 hover:text-blue-500">World map</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
