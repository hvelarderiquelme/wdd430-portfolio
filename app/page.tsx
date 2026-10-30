import ProjectList from "../components/ProjectList"; 

const sampleProjects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website built to showcase my web development capabilities and projects.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    link: "https://github.com"
  },
  {
    title: "Weather App",
    description: "A real-time weather tracking application that fetches data from an external API.",
    technologies: ["JavaScript", "HTML", "CSS API"],
    link: "https://example.com"
  },
  {
    title: "E-Commerce Shopping Cart",
    description: "A full-featured shopping cart system with state management functionality.",
    technologies: ["React", "Context API", "Tailwind"],
    link: "https://example.com"
  }
];

// Ensure this matches exactly: export, default, function, capitalized name
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Projects Portfolio</h1>
      <ProjectList projects={sampleProjects} />
    </div>
  );
}


