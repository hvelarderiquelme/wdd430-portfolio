// app/school/page.tsx
import Link from "next/link";
import { getProjects } from "@/lib/projects-db";
import { Suspense } from "react";

// Play 1: The child component that isolates the database fetch
// We add a 'category' prop so it knows exactly what to fetch
interface ProjectListProps {
  category: string;
}

// 🎨 Component-Level Skeleton Fallback
function SchoolProjectsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border border-zinc-100 rounded-xl bg-zinc-50/50">
          <div className="h-5 w-1/3 bg-zinc-200 rounded mb-2" />
          <div className="h-4 w-3/4 bg-zinc-200 rounded" />
        </div>
      ))}
    </div>
  );
}

async function ProjectListByCategory({ category }: ProjectListProps) {
  const projects = await getProjects(category); 

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 border border-dashed rounded-xl bg-zinc-50/50">
        No school projects found yet.
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

// Play 2: Your main page architecture layout
export default function SchoolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">School Projects</h1>
      
      {/* 🎯 Safely wrapped! The title renders instantly while the database loads */}
      <Suspense fallback={<SchoolProjectsSkeleton />}>
        <ProjectListByCategory category="school" />
      </Suspense>
    </div>
  );
}
