import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="p-5 border-l-4 border-blue-600 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-r border-y border-r border-gray-100 flex flex-col justify-between h-full">
      <div>
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
        
        {/* Technologies as sleek pill badges */}
        <div className="flex flex-wrap gap-2 mb-4">
            <strong>Technologies:</strong>
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs font-medium px-2.5 py-1 rounded bg-blue-50 text-blue-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Conditional Link Button */}
      {link && (
        <div className="mt-auto pt-2">
          {/* Use standard <a> if it's an external URL, otherwise Next.js <Link> is better for internal paths */}
          {link.startsWith('http') ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Project 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          ) : (
            <Link 
              href={link} 
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Details &rarr;
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
