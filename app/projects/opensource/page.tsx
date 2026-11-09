import { Project } from '@/lib/projects-db';


async function fetchOpenSource() {
  const res = await fetch('http://localhost:3000/api/projects?type=opensource', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch open source projects');
  return res.json() as Promise<Project[]>;
}

export default async function OpenSourcePage() {
  const projects = await fetchOpenSource();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-4">Open Source Contributions</h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-xl bg-emerald-50/50 border-emerald-200">
            <h2 className="font-semibold text-lg text-emerald-900">{project.title}</h2>
            <p className="text-zinc-600 text-sm mt-1">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
