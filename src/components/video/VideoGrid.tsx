import React from 'react';

import { Video } from '../../types';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
  showHeader?: boolean;
  layout?: 'grid' | 'row' | 'compact';
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  title, 
  columns = 3, 
  showHeader = true,
  layout = 'grid'
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  
  
  return (
    <section ref={ref} className="mb-8">
      {showHeader && title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {videos.length > 4 && (
            <button className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
              View all
            </button>
          )}
        </div>
      )}
      
      <motion.div 
        className={`grid ${columnClasses[columns]} gap-4`}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} layout={layout} />
        ))}
      </motion.div>
    </section>
  );
};

export default () => <React.Suspense fallback={<div>Loading...</div>}><Component /></React.Suspense> VideoGrid;