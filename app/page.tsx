import Link from "next/link";
import ProjectList from "../components/ProjectList";
import { getFeaturedProjects } from "@/lib/projects-db";

export default async function Home() {
  // throw new Error("Simulated database failure");
  const featProjects = await getFeaturedProjects();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className ="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Featured Projects</h1>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          View All Projects
        </Link>
      </div>
      
      {featProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-zinc-50 p-8 text-center">
          <p className="text-gray-600">
            No featured projects are available right now.
          </p>
          <Link
            href="/projects"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Browse all projects &rarr;
          </Link>
        </div>
      ) : (
        <ProjectList projects={featProjects} />
      )}
    </div>
  );
}


