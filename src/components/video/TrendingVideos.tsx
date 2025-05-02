import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { Video } from '../../types';
import { Link } from 'react-router-dom';
import { formatViewCount, formatTimeAgo } from '../../utils/format';
import { useInView } from 'react-intersection-observer';

interface TrendingVideosProps {
  videos: Video[];
}

const TrendingVideos: React.FC<TrendingVideosProps> = ({ videos }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  if (videos.length === 0) return null;
  
  return (
    <motion.section 
      ref={ref}
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <TrendingUp size={20} className="mr-2 text-accent-500" />
          <span>Trending Now</span>
        </h2>
        <Link to="/trending" className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link to={`/video/${video.id}`} className="block relative">
              <div className="w-full aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="absolute top-2 left-2 bg-accent-500 text-white text-sm font-bold py-0.5 px-2 rounded-full flex items-center">
                #{index + 1} <TrendingUp size={14} className="ml-1" />
              </div>
            </Link>
            
            <div className="p-4">
              <Link to={`/video/${video.id}`} className="block">
                <h3 className="font-medium text-base line-clamp-2 mb-2">{video.title}</h3>
              </Link>
              
              <div className="flex items-start">
                <Link to={`/profile/${video.creator.id}`} className="mr-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={video.creator.avatar} 
                      alt={video.creator.displayName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/profile/${video.creator.id}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {video.creator.displayName}
                  </Link>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <span>{formatViewCount(video.stats.views)} views</span>
                      <span className="mx-1">•</span>
                      <span>{formatTimeAgo(video.uploadDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-accent-500 text-xs font-medium">
                      <BarChart2 size={12} className="mr-1" />
                      +{Math.floor(Math.random() * 200) + 50}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingVideos;