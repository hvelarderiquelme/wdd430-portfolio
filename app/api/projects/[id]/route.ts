import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
  _request: Request,
  // Fixed: params is wrapped in a Promise to match Next.js 16 rules
  { params }: { params: Promise<{ id: string }> }
) {
  // Fixed: Unwrapping the Promise before converting it to a Number
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const project = await getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}
