import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video } from '../../types';
import { formatViewCount } from '../../utils/format';
import { Link } from 'react-router-dom';
import { Play, Users, Radio } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface LivestreamBannerProps {
  livestreams: Video[];
}

const LivestreamBanner: React.FC<LivestreamBannerProps> = ({ livestreams }) => {
  const [activeStream, setActiveStream] = useState(livestreams[0]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  if (livestreams.length === 0) return null;
  
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
          <Radio size={20} className="mr-2 text-red-500 animate-pulse" />
          <span>Live Now</span>
        </h2>
        <Link to="/live" className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
          View all
        </Link>
      </div>
      
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden relative">
        <div className="absolute top-4 left-4 z-30 bg-red-500 text-white py-1 px-3 rounded-full flex items-center text-sm font-medium">
          <Radio size={14} className="mr-1 animate-pulse" />
          LIVE
        </div>
        
        <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white py-1 px-3 rounded-full flex items-center text-sm">
          <Users size={14} className="mr-1" />
          {formatViewCount(activeStream.stats.views)} watching
        </div>
        
        <div className="relative aspect-video max-h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <img 
            src={activeStream.thumbnail} 
            alt={activeStream.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="flex items-center mb-3">
              <img 
                src={activeStream.creator.avatar} 
                alt={activeStream.creator.displayName}
                className="w-10 h-10 rounded-full border-2 border-white mr-3"
              />
              <div>
                <Link to={`/profile/${activeStream.creator.id}`} className="text-white font-medium hover:text-brand-400 transition-colors">
                  {activeStream.creator.displayName}
                </Link>
                <p className="text-white/70 text-sm">{activeStream.category}</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{activeStream.title}</h3>
            <p className="text-white/80 mb-4 line-clamp-2 max-w-2xl">{activeStream.description}</p>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                to={`/video/${activeStream.id}`}
                className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-full flex items-center font-medium transition-colors"
              >
                <Play size={16} className="mr-2" fill="white" />
                Watch Now
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full flex items-center font-medium backdrop-blur-sm transition-colors">
                Remind Me
              </button>
            </div>
          </div>
        </div>
        
        {livestreams.length > 1 && (
          <div className="bg-gray-900 p-4 flex gap-3 overflow-x-auto">
            {livestreams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setActiveStream(stream)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  activeStream.id === stream.id ? 'border-brand-500 scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative w-40 aspect-video">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs py-px px-1 rounded">
                    LIVE
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default LivestreamBanner;