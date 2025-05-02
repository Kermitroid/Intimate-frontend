import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '../../types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { formatViewCount } from '../../utils/format';

interface ShortsCarouselProps {
  shorts: Video[];
}

const ShortsCarousel: React.FC<ShortsCarouselProps> = ({ shorts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  
      scrollToIndex(currentIndex + 1);
    }
  };
  
  
      scrollToIndex(currentIndex - 1);
    }
  };
  
  
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };
  
  if (shorts.length === 0) return null;
  
  return (
    <section className="relative py-6 my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl -z-10"></div>
      
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-brand-500 dark:text-brand-400">#</span>Shorts
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={cn(
              "p-2 rounded-full",
              currentIndex === 0 
                ? "text-gray-400 cursor-not-allowed" 
                : "bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= shorts.length - 3}
            className={cn(
              "p-2 rounded-full",
              currentIndex >= shorts.length - 3
                ? "text-gray-400 cursor-not-allowed" 
                : "bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-2 no-scrollbar"
        ref={carouselRef}
      >
        {shorts.map((short, index) => (
          <motion.div
            key={short.id}
            className="flex-shrink-0 w-48"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/video/${short.id}`} className="block h-80 rounded-xl overflow-hidden relative shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={short.thumbnail} 
                alt={short.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <h3 className="text-white font-medium text-sm line-clamp-2">{short.title}</h3>
                <div className="flex items-center mt-2">
                  <img 
                    src={short.creator.avatar} 
                    alt={short.creator.displayName} 
                    className="w-5 h-5 rounded-full mr-2 object-cover"
                  />
                  <span className="text-white/80 text-xs">{short.creator.displayName}</span>
                </div>
                <div className="mt-1 text-xs text-white/70">
                  {formatViewCount(short.stats.views)} views
                </div>
              </div>
              
              <div className="absolute top-2 left-2 z-20 bg-black/50 text-white py-0.5 px-2 rounded text-xs">
                Short
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShortsCarousel;