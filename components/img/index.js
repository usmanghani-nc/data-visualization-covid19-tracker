import Image from 'next/image';

export default function Img({ src, alt, h, w }) {
  return (
    <div className={`relative ${h ? h : 'h-20'} ${w ? w : 'w-20'}`}>
      <Image src={src} layout="fill" objectFit="contain" alt={alt} />
    </div>
  );
}
