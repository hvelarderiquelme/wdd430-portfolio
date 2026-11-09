import Link from 'next/link';

interface ProjectsLayoutProps {
    children: React.ReactNode;
}

export default function ProjectsLayout({children} : ProjectsLayoutProps) {
    return(
        <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Section-Specific UI: Sidebar / Navigation Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
            <span className="hidden md:block text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">
              Project Dashboard
            </span>
            
            <Link 
              href="/projects/opensource" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-200 text-zinc-700 transition"
            >
              Open Source Projects
            </Link>
            
            <Link 
              href="/projects/school" 
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-200 text-zinc-700 transition"
            >
              School Projects
            </Link>
          </nav>
        </aside>

        {/* Render children (This is where sub-pages like /projects/page.tsx will load) */}
        <main className="flex-1 bg-white border border-zinc-200 p-6 rounded-2xl min-h-[400px]">
          {children}
        </main>

      </div>
    </div>
    );
}

