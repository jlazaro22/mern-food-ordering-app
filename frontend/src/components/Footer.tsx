export default function Footer() {
  return (
    <div className='bg-orange-500 py-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <span className='text-white text-3xl font-bold tracking-tight'>
          MernEats.com
        </span>
        <span className='text-white font-bold tracking-tight flex gap-4'>
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
        </span>
      </div>
    </div>
  );
}
