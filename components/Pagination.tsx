'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Helper function to build the page link while keeping our search keyword
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Do not display pagination if everything fits onto one single page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      {/* PREVIOUS LINK */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-700 bg-white hover:bg-zinc-50 transition"
        >
          &larr; Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border border-zinc-100 rounded-lg text-sm text-zinc-300 bg-zinc-50 cursor-not-allowed">
          &larr; Previous
        </span>
      )}

      {/* PAGE COUNTER INDICATOR */}
      <span className="text-sm text-zinc-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {/* NEXT LINK */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-700 bg-white hover:bg-zinc-50 transition"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 border border-zinc-100 rounded-lg text-sm text-zinc-300 bg-zinc-50 cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </div>
  );
}
