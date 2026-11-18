"use client";

import { useActionState } from "react";
import { updateProject, State } from "@/lib/actions";
import { Project } from "@/lib/projects-db"; // Adjust import path if your Project type lives elsewhere

const initialState: State = { message: null, errors: {} };

export default function EditProjectForm({ project }: { project: Project }) {
  const updateProjectWithId = updateProject.bind(null, String(project.id));
  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
    initialState
  );

  return (
    <form
      action={formAction}
      noValidate
      className="max-w-2xl mx-auto p-6 bg-white border border-zinc-200 rounded-2xl"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Project</h1>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={project.title}
          aria-describedby="title-error"
          aria-invalid={Boolean(state.errors?.title)}
          className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project.description}
          aria-describedby="description-error"
          aria-invalid={Boolean(state.errors?.description)}
          className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-zinc-700">
          Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={project.type}
          aria-describedby="type-error"
          aria-invalid={Boolean(state.errors?.type)}
          className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="opensource">Open Source</option>
          <option value="school">School</option>
        </select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <label htmlFor="technologies" className="block text-sm font-medium text-zinc-700">
          Technologies
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          defaultValue={project.technologies.join(", ")}
          aria-describedby="technologies-error"
          aria-invalid={Boolean(state.errors?.technologies)}
          className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Link */}
      <div className="mb-4">
        <label htmlFor="link" className="block text-sm font-medium text-zinc-700">
          Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          defaultValue={project.link || ""}
          aria-describedby="link-error"
          aria-invalid={Boolean(state.errors?.link)}
          className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div id="link-error" aria-live="polite" aria-atomic="true">
          {state.errors?.link?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="link" className="block text-sm font-medium text-zinc-700">
          Year Completed
        </label>
          <input
            type="yearCompleted"
            id="number"
            name="yearCompleted"
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="date-error"
            required
          />
          {/* This id matches aria-describedby above */}
            <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
              {state.errors?.yearCompleted?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
      </div>

      {/* Form-level status announcement */}
      <div aria-live="polite" aria-atomic="true" className="mb-4">
        {state.message && (
          <p className="text-sm font-medium text-red-600">{state.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Project"}
      </button>
    </form>
  );
}
