// app/opensource/loading.tsx
export default function OpenSourceLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Skeleton Title */}
      <div className="h-9 w-64 bg-zinc-200 rounded-md mb-6" />
      
      {/* Skeleton Project List Container */}
      <div className="space-y-4">
        {/* Render 3 placeholder project items */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-zinc-100 rounded-xl bg-zinc-50/50">
            {/* Project Title Line */}
            <div className="h-5 w-1/3 bg-zinc-200 rounded mb-2" />
            {/* Project Description Line */}
            <div className="h-4 w-3/4 bg-zinc-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
