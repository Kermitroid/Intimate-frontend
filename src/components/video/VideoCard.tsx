import axios from "axios";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, CheckCircle } from 'lucide-react';
import { Video } from '../../types';
import { formatDuration, formatViewCount, formatTimeAgo } from '../../utils/format';
import { cn, truncateText } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'row' | 'compact';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, title, thumbnail, duration, uploadDate, creator, stats, videoType } = video;
  
  
  
  
  
  
  
  
  return (
    <motion.div
      className={cardClasses[layout]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <Link to={`/video/${id}`} className={thumbnailClasses[layout]}>
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 z-10"></div>
        
        <img 
          src={thumbnail} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700", 
            isHovered && !isShort && "scale-110"
          )}
        />
        
        {/* Duration Badge */}
        {!isShort && (
          <div className={cn(
            "absolute bottom-2 right-2 z-20 px-1.5 py-0.5 rounded text-xs font-medium",
            isLive ? "bg-red-500 text-white" : "bg-black/80 text-white"
          )}>
            {formatDuration(duration)}
          </div>
        )}
        
        {/* Video Type Indicator */}
        {(isShort || isImmersive) && (
          <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 rounded text-xs font-medium bg-black/80 text-white flex items-center">
            {isShort && <span>Short</span>}
            {isImmersive && <span>360°</span>}
          </div>
        )}
        
        {/* Play Button Overlay (only shown on hover) */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center z-20 bg-black/30 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-12 h-12 rounded-full bg-brand-500/90 flex items-center justify-center">
            <Play size={20} fill="white" className="text-white ml-1" />
          </div>
        </div>
      </Link>
      
      <div className={contentClasses[layout]}>
        <div className="flex">
          {layout !== 'compact' && (
            <Link to={`/profile/${creator.id}`} className="mr-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img 
                  src={creator.avatar} 
                  alt={creator.displayName} 
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
          
          <div className="flex-1 min-w-0">
            <Link to={`/video/${id}`} className="block">
              <h3 className={titleClasses[layout]}>{title}</h3>
            </Link>
            
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              <Link to={`/profile/${creator.id}`} className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                <span className="inline-flex items-center">
                  {creator.displayName}
                  {creator.isVerified && <CheckCircle size={14} className="ml-1 text-brand-500 dark:text-brand-400" fill="currentColor" />}
                </span>
              </Link>
            </div>
            
            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-500">
              <span>{formatViewCount(stats.views)} views</span>
              <span className="mx-1">•</span>
              <span>{formatTimeAgo(uploadDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;