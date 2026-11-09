import { Project, getProjects } from "@/lib/projects-db"; // 1. Import getProjects directly

export const instant = false; // 2. Fixes the Next.js prerendering/uncached data error!

export default async function AllProjectsPage(){
    // 3. Bypass fetch completely! Talk directly to the database.
    // This is super fast and will never break on deployment.
    const projects = await getProjects(); 

    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects Overview</h1>
            <div className = "space-y-4">
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
