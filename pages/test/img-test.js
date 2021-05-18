import Image from '../../components/img';

export default function Test({}) {
  return (
    <div className="max-w-screen-xl  mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="w-1/3">
          <Image src="/imgpublic.jpg" h="h-64" w="w-full" />
        </div>

        <div className="w-1/3">
          <Image src="/imgpublic.jpg" h="h-64" w="w-full" />
        </div>

        <div className="w-1/3">
          <Image src="/imgpublic.jpg" h="h-64" w="w-full" />
        </div>
      </div>
    </div>
  );
}
