import Link from "next/link";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";
import { ProjectSearch } from "@/components/ProjectSearch";
import { Pagination } from "@/components/Pagination";
import { Suspense } from "react";

// 1. Child component that awaits searchParams INSIDE <Suspense>
async function ProjectsContent({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || "";
  const currentPage = Number(resolvedParams?.page) || 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <>
      {projects.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 border border-dashed rounded-xl bg-zinc-50/50">
          No projects found matching `${query}`. Try a different search term.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 border rounded-xl bg-zinc-50">
              <Link
                href={`/projects/${project.id}`}
                className="block hover:bg-zinc-100 transition-colors rounded-lg p-2"
              >
                <h2 className="font-semibold text-lg text-zinc-800">{project.title}</h2>
                <p className="text-zinc-600 text-sm mt-1">{project.description}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination sits inside the same Suspense boundary */}
      <Pagination totalPages={totalPages} />
    </>
  );
}

// 2. Main Page stays static and passes searchParams down without awaiting
export default function AllProjectsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  // throw new Error("Simulated database failure");
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects Overview</h1>

      {/* Search bar wrapped in Suspense */}
      <Suspense fallback={<div className="mb-6 h-10 bg-zinc-100 rounded-xl animate-pulse" />}>
        <ProjectSearch />
      </Suspense>

      {/* Projects list + Pagination wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 h-24 bg-zinc-100 rounded-xl" />
            ))}
          </div>
        }
      >
        <ProjectsContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
