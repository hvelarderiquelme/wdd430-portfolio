// 1. Define the TypeScript interface for your props
interface TimelineItemProps {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

// 2. Build the Server Component (Notice: No "use client" directive here)
export default function TimelineItem({ year, title, subtitle, description }: TimelineItemProps) {
  return (
    <div className="relative pl-6 border-l-2 border-blue-600 pb-6 last:pb-2">
      {/* Visual Marker Dot */}
      <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></div>
      
      {/* Timeline Content styled with Tailwind CSS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
          {year}
        </span>
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      </div>
      
      <p className="text-sm font-semibold text-gray-500 mb-1">{subtitle}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
