import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import EditProjectForm from "@/components/EditProjectForm";

// 1. Server component awaits params and fetches project inside <Suspense>
async function EditProjectContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId) || numericId <= 0) {
    notFound();
  }

  const project = await getProjectById(numericId);
  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}

// 2. Main Page stays static and wraps the content in <Suspense>
export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto p-6 h-96 bg-zinc-100 animate-pulse rounded-2xl" />
        }
      >
        <EditProjectContent params={params} />
      </Suspense>
    </div>
  );
}
