import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative w-full h-full flex flex-col md:flex-row bg-black"
        layoutId={`wrapper-${project.id}`}
      >
        {/* Background Image Area */}
        <div className="relative w-full h-[50vh] md:h-full md:w-1/2 overflow-hidden">
           <motion.div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            layoutId={`bg-${project.id}`}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Area */}
        <motion.div 
          className="w-full h-[50vh] md:h-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 border border-white/20 rounded-full hover:bg-white/10 hover:scale-110 transition-all z-50 group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 opacity-60">
              <span className="border border-white/30 px-3 py-1 rounded-full text-xs tracking-widest uppercase">{project.category}</span>
              <span className="text-xs font-mono">{project.year}</span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            <motion.div 
              className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Role</h3>
                <p className="font-medium text-sm md:text-base">Lead Designer</p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Agency</h3>
                <p className="font-medium text-sm md:text-base">Studio Void</p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Client</h3>
                <p className="font-medium text-sm md:text-base">Global Tech Inc.</p>
              </div>
              <div>
                 <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Year</h3>
                <p className="font-medium text-sm md:text-base">{project.year}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
