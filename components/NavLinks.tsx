'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            // Tailwind conditional styles
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
