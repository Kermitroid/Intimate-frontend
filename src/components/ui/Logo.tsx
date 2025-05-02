import React from 'react';
import { Play } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-md mr-2">
        <Play size={16} fill="white" className="text-white ml-0.5" />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500 dark:from-indigo-400 dark:to-rose-400">
        VidSync
      </span>
    </div>
  );
};

export default Logo;