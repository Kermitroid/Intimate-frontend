import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// Define content categories

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <motion.div 
      className="mb-6 overflow-x-auto no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex space-x-1 pb-2 border-b border-gray-200 dark:border-gray-800">
        {categories.map((category) => {
          
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                isSelected 
                  ? "bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryTabs;