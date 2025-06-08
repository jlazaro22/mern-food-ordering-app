import heroImage from '../assets/hero.png';

export default function Hero() {
  return (
    <div>
      <img
        src={heroImage}
        alt='hero'
        className='w-full max-h-[500px] object-cover'
      />
    </div>
  );
}
