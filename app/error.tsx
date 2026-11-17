"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled page error:", error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          An unexpected error occurred while loading this page.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/projects"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
