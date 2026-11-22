"use server";

import { z } from "zod";
import { sql} from "@vercel/postgres";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

const currentYear = new Date().getFullYear();

const projectFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.enum(["opensource", "school"], { message: "Type must be either 'opensource' or 'school'" }),
    technologies: z.string().min(1, { message: "At least one technology is required" }),
    link: z.string().url({ message: "Link must be a valid URL" }).optional().or(z.literal("")), // Allow empty string for optional link
    yearCompleted : z.coerce
        .number({message: "A year yyyy is required."})
        .min(1,{message: "A year yyyy is required."})
        .int("Year must be a whole number.")
        .gte(2000, "Year must be 2000 or later.")
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),        
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        type?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

export async function createProject(prevState: State, formData: FormData):Promise<State> {
    const session = await requireOwnerSession();
    if(!session){
        return {message: 'Unathorized. You must be sigen in to create a project.'}
    }
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        technologies: formData.get("technologies"),
        link: formData.get("link"),
        yearCompleted: formData.get("yearCompleted"),
    }
   
    const parsedData = projectFormSchema.safeParse(rawData);

    if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create project.",
    };
  }

    const { title, description, type, technologies, link } = parsedData.data;
    const cleanedTech = technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean)
        .join(',');

    try{
        await sql`
        INSERT INTO projects (title, description, type, technologies, link)
        VALUES (${title}, ${description}, ${type}, string_to_array(${cleanedTech}, ','), ${link || null})
    `;

        updateTag("featured-projects");
        updateTag("filtered-projects");
        updateTag("project-byId");
        updateTag("projects");
        revalidatePath("/", "layout");
       
    }catch (error){
        console.error("Database Error: Failed to create project.", error);
       return {
      message: "Database Error: Failed to create project.",
    };
    }

     // Always call redirect() AFTER the try...catch block
     redirect("/projects");

}

export async function updateProject(id: string, prevState: State, formData: FormData):Promise<State> {
    const session = await requireOwnerSession();
    if(!session){
        return {message: 'Unathorized. You must be sigen in to update a project.'}
    }
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        technologies: formData.get("technologies"),
        link: formData.get("link"),
    }

    const parsedData = projectFormSchema.safeParse(rawData);

    if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update project.",
    };
  }

    const { title, description, type, technologies, link } = parsedData.data;
    const cleanedTech = technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean)
        .join(',');
    try{
        await sql`
            UPDATE projects
            SET title = ${title}, description = ${description}, type = ${type}, technologies = string_to_array(${cleanedTech}, ','), link = ${link || null}
            WHERE id = ${id}
        `;

        updateTag("featured-projects");
        updateTag("filtered-projects");
        updateTag("project-byId");
        updateTag("projects");
        revalidatePath("/", "layout");
    }catch(error){
        console.error("Database Error: Failed to update project.", error);
        return {
            message: "Database Error: Failed to update project.",
        }
    };    
    // Always call redirect() AFTER the try...catch block
    redirect("/projects");
}

export async function deleteProject(id: string) {
    const session = await requireOwnerSession();
    if(!session){
        throw new Error("Unauthorized. You must be signed in to delete a project.");
    }
    try{
    await sql`
        DELETE FROM projects
        WHERE id = ${id}
    `;
    
    updateTag("featured-projects");
    updateTag("filtered-projects");
    updateTag("project-byId");
    updateTag("projects");
    revalidatePath("/", "layout");
    }catch(error){
        console.error("Database Error: Failed to delete project.", error);
        throw new Error("Database Error: Failed to delete project.");
    }
    
    // Always call redirect() AFTER the try...catch block
    redirect("/projects");
}

//Authentication
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // re-throw so Next.js handles redirects correctly
  }
}
//Log Out function
export async function logout() {
  await signOut({ redirectTo: '/' });
}
