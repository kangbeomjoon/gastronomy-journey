import React, { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Plus } from "lucide-react";
import { PROJECTS } from "./data/projects";
import { OrbitingRing } from "./components/OrbitingRing";
import { GalleryItem } from "./components/GalleryItem";
import { ProjectDetail } from "./components/ProjectDetail";

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);

  // Mouse interaction for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reduced stiffness/damping for smoother feel
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    { stiffness: 100, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    { stiffness: 100, damping: 20 },
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <OrbitingRing
          text=" • FINE DINING EXPERIENCE • GASTRONOMY JOURNEY"
          radius={500}
          speed={60}
          direction={1}
        />
        <OrbitingRing
          text=" • CHEF'S SIGNATURE • SEASONAL MENU 2026"
          radius={350}
          speed={40}
          direction={-1}
        />
      </div>

      {/* Header UI */}
      <div className="relative z-50 p-4 md:p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tighter pointer-events-auto cursor-pointer">
            LUMIÈRE
          </h1>
          <p className="text-[8px] md:text-[10px] tracking-[0.3em] opacity-60 mt-1">
            GASTRONOMY JOURNEY
          </p>
        </div>
        <div className="pointer-events-auto cursor-pointer hover:rotate-180 transition-transform duration-700">
          <Plus className="w-6 h-6" />
        </div>
      </div>

      {/* Main Gallery Area */}
      <motion.div
        className="flex-1 w-full h-full p-2 md:p-8 flex items-center justify-center perspective-1000"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative w-full max-w-[95vw] h-[75vh] md:h-[70vh] flex flex-col md:flex-row bg-gray-900/50 border border-white/10 backdrop-blur-sm transform-style-3d shadow-2xl overflow-hidden rounded-lg md:rounded-none"
          style={{ rotateX, rotateY }}
          onMouseLeave={() => setActiveId(PROJECTS[0].id)}
        >
          {PROJECTS.map((project) => (
            <GalleryItem
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onHover={setActiveId}
              onSelect={setSelectedProject}
              totalItems={PROJECTS.length}
            />
          ))}

          {/* Overlay Grid/Decorations */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 z-20" />
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white z-20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white z-20" />
        </motion.div>
      </motion.div>

      {/* Detail View Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer UI */}
      <div className="relative z-50 p-4 md:p-8 flex justify-between items-end mix-blend-difference pointer-events-none text-[8px] md:text-[10px] tracking-[0.2em] opacity-60">
        <div className="flex gap-4 md:gap-8">
          <span className="hidden md:inline">
            RESERVATIONS: +1 234 567 890
          </span>
          <span>DISCOVER THE TASTE</span>
        </div>
        <div>
          <span>COURSES: {PROJECTS.length}</span>
        </div>
      </div>

      {/* Custom Cursor - Hidden on mobile */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[100] hidden md:block"
        style={{
          x: useTransform(
            mouseX,
            (val) =>
              val * window.innerWidth +
              window.innerWidth / 2 -
              8,
          ),
          y: useTransform(
            mouseY,
            (val) =>
              val * window.innerHeight +
              window.innerHeight / 2 -
              8,
          ),
        }}
      />

      {/* Global Styles */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}