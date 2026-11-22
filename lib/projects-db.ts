// lib/projects-db.ts
import { sql } from '@vercel/postgres';
import { cacheTag } from "next/cache";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const ITEMS_PER_PAGE = 3; // Set how many cards you want to see per page

// Existing functions
export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }
  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id
  `;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  "use cache";
  cacheTag("project-byId");
  
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

// 🆕 NEW: Fetch filtered projects matching a search query with pagination slicing
export async function fetchFilteredProjects(query: string, currentPage: number): Promise<Project[]> {
  "use cache";
  cacheTag("filtered-projects");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchPattern = `%${query}%`;

  const { rows } = await sql<Project>`
    SELECT * FROM projects 
    WHERE 
      title ILIKE ${searchPattern} OR 
      description ILIKE ${searchPattern}
    ORDER BY id DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

// 🆕 NEW: Count total records matching search, then compute total pages needed
export async function fetchProjectsPages(query: string): Promise<number> {
  "use cache";
  cacheTag("projects");

  const searchPattern = `%${query}%`;

  const { rows } = await sql`
    SELECT COUNT(*) FROM projects 
    WHERE 
      title ILIKE ${searchPattern} OR 
      description ILIKE ${searchPattern}
  `;

  const totalCount = Number(rows[0].count);
  return Math.ceil(totalCount / ITEMS_PER_PAGE);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  "use cache";
  cacheTag("featured-projects");
  
  try{
    // throw new Error("Simulated database failure");
  const { rows } = await sql<Project>`
    SELECT * FROM projects
    ORDER BY id DESC
    LIMIT 3
  `;
  return rows;
  }catch (error){
    console.error("database Error in getFeaturedProjects:",error);
    return [];
  }  
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const data = await sql<User>`
      SELECT id, name, email, password_hash AS "passwordHash"
      FROM users
      WHERE email = ${email}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

