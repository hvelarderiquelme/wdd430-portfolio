import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

export default async function Header() {
  // "use cache"; /*For Next 16 to statically render this component and cache it for performance. 
  //              This is a new feature in Next 16.*/
  return (
    <header className="bg-blue-600 text-white shadow-md">
      {/* The container wrapper holds both the title AND the nav elements on one row */}
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Brand / Name */}
        <div id="header-title" className="text-2xl font-bold">
          <Link href="/">Horacio Velarde</Link>
        </div>

        {/* Navigation Links */}
        <Suspense fallback={<div className="h-6 w-48 animate-pulse bg-blue-500 rounded" />}>
          <NavLinks />
        </Suspense>

      </div>
    </header>
  );
}
