import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          404 Error
        </p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900">
          Project Not Found
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          The project you are looking for does not exist or may have been deleted.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          <span>&larr;</span>
          <span>Back to All Projects</span>
        </Link>
      </div>
    </div>
  );
}
