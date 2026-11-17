import { cacheLife } from 'next/cache';

async function getCurrentYear() {
  'use cache';
  cacheLife('max');
  return new Date().getFullYear();
}

export default async function Footer() {
  "use cache"; /*For Next 16 to statically render this component and cache it for performance. 
               This is a new feature in Next 16.*/
  const currentYear = await getCurrentYear();

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {currentYear} | Horacio Velarde | All rights reserved</p>
      </div>
    </footer>
  );
}
