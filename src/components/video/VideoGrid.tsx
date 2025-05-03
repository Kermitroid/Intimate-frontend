import React from 'react';
import { Video } from '../../types';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
  showHeader?: boolean;
  layout?: 'grid' | 'row' | 'compact';
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  title,
  columns = 3,
  showHeader = true,
  layout = 'grid'
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="mb-8">
      {showHeader && title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {videos.length > 4 && (
            <button className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300">
              View all
            </button>
          )}
        </div>
      )}

      <motion.div
        className={`grid ${columnClasses[columns]} gap-4`}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} layout={layout} />
        ))}
      </motion.div>
    </section>
  );
};

export default VideoGrid;
