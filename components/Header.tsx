import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      {/* The container wrapper holds both the title AND the nav elements on one row */}
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Brand / Name */}
        <div id="header-title" className="text-2xl font-bold">
          <Link href="/">Horacio Velarde</Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-6 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-200 transition-colors">About</Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
