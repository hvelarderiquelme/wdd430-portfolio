// app/projects/page.tsx
import { Project, getProjects } from "@/lib/projects-db";

// Fixes the Next.js prerendering validation error by letting it render on-demand
export const instant = false; 

export default async function AllProjectsPage(){
    // Fetch directly from your Vercel database without using a local network fetch!
    const projects = await getProjects(); 

    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects Overview</h1>
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
