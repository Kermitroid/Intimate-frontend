import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Brain, Music, Zap, Coffee, Sparkles } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

// Define available moods with their icons

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodChange }) => {
  return (
    <motion.div 
      className="mb-6 overflow-x-auto no-scrollbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-2 pb-2">
        {moods.map((mood) => {
          
          
          return (
            <motion.button
              key={mood.id}
              onClick={() => onMoodChange(mood.name)}
              className={cn(
                "flex-shrink-0 flex items-center px-4 py-2 rounded-full transition-all duration-300",
                isSelected 
                  ? "bg-brand-500 text-white shadow-md" 
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={16} className={cn("mr-2", isSelected ? "text-white" : "text-brand-500 dark:text-brand-400")} />
              <span className="font-medium">{mood.name}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MoodSelector;