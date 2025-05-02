import React from 'react';

import { motion } from 'framer-motion';

import { Video } from '../../types';
import { Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface RecommendationSectionProps {
  title: string;
  videos: Video[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ title, videos }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
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
          <Sparkles size={18} className="mr-2 text-brand-500" />
          <span>{title}</span>
        </h2>
      </div>
      
      <VideoGrid videos={videos} columns={3} showHeader={false} />
    </motion.section>
  );
};

export default () => <React.Suspense fallback={<div>Loading...</div>}><Component /></React.Suspense> RecommendationSection;