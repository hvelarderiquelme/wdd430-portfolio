import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { deleteProject } from "@/lib/actions";

// 1. Child component awaits params and fetches data INSIDE <Suspense>
async function ProjectDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // throw new Error("Simulated database failure");
  const { id } = await params;
  const numericId = Number(id);
  
  if (Number.isNaN(numericId) || numericId <= 0) {
    notFound();
  }

  const project = await getProjectById(numericId);
  if (!project) {
    notFound();
  }

  const deleteProjectWithId = deleteProject.bind(null, String(project.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-zinc-900">{project.title}</h1>
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          {project.type}
        </span>
      </div>

      <p className="text-base text-zinc-600 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="mb-8">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-medium bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.link && (
        <div className="mb-8">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-all"
          >
            <span>View Project</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      )}

      <div className="flex items-center gap-3 pt-6 border-t border-zinc-200">
        <Link
          href={`/projects/${project.id}/edit`}
          className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
        >
          Edit Project
        </Link>

        <form action={deleteProjectWithId}>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete Project
          </button>
        </form>
      </div>
    </>
  );
}

// 2. Main Page stays static and passes params down without awaiting
export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          <span>Back to Projects</span>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4 animate-pulse">
            <div className="h-9 w-2/3 bg-zinc-100 rounded-lg" />
            <div className="h-24 bg-zinc-100 rounded-xl" />
            <div className="h-10 w-36 bg-zinc-100 rounded-lg" />
          </div>
        }
      >
        <ProjectDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
