import { Project, getProjects } from "@/lib/projects-db";

// 1. Tell Next.js 16 to allow dynamic database execution safely
export const instant = false; 

export default async function OpenSourcePage() {
  // 2. Fetch directly from your live Vercel database function!
  const projects = await getProjects('opensource');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Open Source Projects</h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-xl bg-zinc-50">
            <h2 className="font-semibold text-lg text-zinc-800">{project.title}</h2>
            <p className="text-zinc-600 text-sm mt-1">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
