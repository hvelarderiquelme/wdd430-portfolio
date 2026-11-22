import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { SignOutButton } from './sign-out-button';
import { auth } from '@/auth';
import { connection } from 'next/server';

// Create a small async component to fetch the session inside Suspense
async function NavSection() {
  await connection();
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center gap-4">
      <NavLinks user={user} />
      {user && <SignOutButton />}
    </div>
  );
}

export default async function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      {/* The container wrapper holds both the title AND the nav elements on one row */}
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Brand / Name */}
        <div id="header-title" className="text-2xl font-bold">
          <Link href="/">Horacio Velarde</Link>
        </div>

        {/* Navigation Links + Sign Out Button */}
        <Suspense fallback={<div className="h-6 w-48 animate-pulse bg-blue-500 rounded" />}>
          <NavSection />
        </Suspense>

      </div>
    </header>
  );
}
