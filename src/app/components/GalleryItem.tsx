import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
}

interface GalleryItemProps {
  project: Project;
  isActive: boolean;
  onHover: (id: number) => void;
  onSelect: (project: Project) => void;
  totalItems: number;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ project, isActive, onHover, onSelect }) => {
  return (
    <motion.div
      layout
      layoutId={`wrapper-${project.id}`}
      onMouseEnter={() => onHover(project.id)}
      onClick={() => onSelect(project)}
      className={clsx(
        "relative overflow-hidden cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] group border-white/10",
        "w-full h-auto border-b md:h-full md:w-auto md:border-b-0 md:border-r min-h-[40px] md:min-w-[60px]"
      )}
      style={{
        flex: isActive ? 8 : 1,
        filter: isActive ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(50%)'
      }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        layoutId={`bg-${project.id}`}
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>

      {/* Content Container */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10 pointer-events-none mix-blend-difference text-white">
        
        {/* Top Info */}
        <div className="flex justify-between items-start overflow-hidden">
          <motion.span 
            className="text-[10px] md:text-xs font-mono tracking-widest opacity-60"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          >
            {project.year}
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white flex items-center justify-center bg-white/10 backdrop-blur-sm"
          >
            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
          </motion.div>
        </div>

        {/* Bottom Info */}
        <div className="relative h-full flex flex-col justify-end">
          {/* Collapsed State Title */}
          <motion.div 
            className="absolute bottom-0 left-0 origin-bottom-left"
            initial={{ opacity: 1, y: 0 }}
            animate={{ 
              opacity: isActive ? 0 : 1,
              y: isActive ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
          >
             {/* Mobile: Horizontal */}
            <div className="md:hidden pb-1"> 
              <span className="text-lg font-bold tracking-tighter uppercase opacity-60 truncate block max-w-[200px]">
                {project.title}
              </span>
            </div>
             {/* Desktop: Vertical */}
            <div className="hidden md:block transform -rotate-90 origin-bottom-left translate-x-8 -translate-y-2">
              <span className="text-2xl font-bold tracking-tighter uppercase opacity-60 whitespace-nowrap">
                {project.title.split(" ")[0]}
              </span>
            </div>
          </motion.div>

          {/* Expanded State Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-2 md:gap-4 max-w-[90%] md:max-w-[80%]"
          >
            <div>
              <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 mb-2 text-[8px] md:text-[10px] border border-white/30 rounded-full uppercase tracking-widest">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-[0.9] uppercase break-words">
                {project.title}
              </h2>
            </div>
            <p className="text-xs md:text-sm font-light text-gray-300 tracking-wide max-w-md line-clamp-2 md:line-clamp-none">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
