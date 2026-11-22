'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-700 text-white hover:bg-blue-800 transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  );
}
