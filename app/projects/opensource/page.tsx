import Link from "next/link";
import { getProjects } from "@/lib/projects-db";
import { Suspense } from "react";

interface ProjectListProps {
  category: string;
}

async function ProjectListByCategory({ category }: ProjectListProps) {
  const projects = await getProjects(category);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 border border-dashed rounded-xl bg-zinc-50/50">
        No open source projects found yet.
      </div>
    );
  }

  return (
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
  );
}

export default function OpenSourcePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Open Source Projects</h1>

      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 h-24 bg-zinc-100 rounded-xl" />
            ))}
          </div>
        }
      >
        <ProjectListByCategory category="opensource" />
      </Suspense>
    </div>
  );
}
