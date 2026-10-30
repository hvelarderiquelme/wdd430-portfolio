import TimelineItem from "@/components/TimeLineItem";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 flex-grow">
      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        About Me
      </h2>

      {/* Grid Layout: Splitting Bio and Skills */}
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        
        {/* Left Side: Short Bio (Takes up 2 columns on desktop) */}
        <section className="md:col-span-2 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Hi, I am <strong className="text-blue-600">Horacio Velarde</strong>! I am a passionate web developer currently studying in the Pathway program, focusing on modern web development architectures like React and Next.js.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I love solving complex layout puzzles, writing clean, component-driven code, and building responsive applications that look beautiful on both phone and computer screens. 
          </p>
          <p className="text-gray-600 leading-relaxed">
            When I am not coding or studying for school assignments, you can usually find me exploring new design tools, open-source repositories, or tinkering with layout styling frameworks like Tailwind CSS.
          </p>
        </section>

        {/* Right Side: Core Skills Panel (Takes up 1 column on desktop) */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-150 shadow-sm h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Core Skills</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> React & Next.js
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> TypeScript / JavaScript
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> Tailwind CSS & HTML5
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> Git & GitHub Actions
            </li>
          </ul>
        </section>

      </div>

      {/* 3. Bottom Section: Full-Width Education Timeline */}
      <section className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Education & History</h3>
        <div className="mt-4">
          <TimelineItem 
            year="2026 - Present"
            title="WDD430 Web Development"
            subtitle="BYU-Pathway Worldwide"
            description="Deep diving into full-stack web applications using advanced styling utilities, React UI composition principles, and server environments like Next.js."
          />
          <TimelineItem 
            year="2025"
            title="Intro to Web Frontend"
            subtitle="Pathway Portfolio Courses"
            description="Learned structural semantic layouts with HTML5, responsive CSS layout mechanics, and DOM adjustments using modern JavaScript script patterns."
          />
        </div>
      </section>

      {/* Simple Call to Action Box */}
      <section className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Want to work together?</h3>
        <p className="text-blue-700 mb-4 text-sm">I am always looking for interesting projects and collaborative coding opportunities.</p>
        <a 
          href="mailto:your-email@example.com" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded shadow transition-colors"
        >
          Get In Touch
        </a>
      </section>
    </main>
  );
}
