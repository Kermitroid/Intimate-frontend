import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import { CheckCircle, Bell, BellOff, UserPlus } from 'lucide-react';
import { formatViewCount } from '../../utils/format';
import { useInView } from 'react-intersection-observer';

interface FeaturedCreatorProps {
  creator: User;
}

const FeaturedCreator: React.FC<FeaturedCreatorProps> = ({ creator }) => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = React.useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  
    if (!isSubscribed) {
      setIsNotificationsOn(true);
    }
  };
  
  
  };
  
  return (
    <motion.section 
      ref={ref}
      className="mb-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Featured Creator</h2>
      </div>
      
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-brand-100 to-accent-100 dark:from-brand-900/40 dark:to-accent-900/40">
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <img 
                src={creator.avatar} 
                alt={creator.displayName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <h3 className="text-2xl font-bold mr-2">{creator.displayName}</h3>
              {creator.isVerified && (
                <CheckCircle size={20} className="text-brand-500" fill="currentColor" />
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-2">@{creator.username}</p>
            
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              {formatViewCount(creator.subscribers)} subscribers
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
              Creating amazing content about technology, coding tutorials, and digital lifestyle. Join me on this journey to explore the digital world!
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={toggleSubscription}
                className={`${
                  isSubscribed 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                } px-5 py-2 rounded-full flex items-center font-medium transition-colors`}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle size={16} className="mr-2" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <UserPlus size={16} className="mr-2" />
                    Subscribe
                  </>
                )}
              </button>
              
              {isSubscribed && (
                <button
                  onClick={toggleNotifications}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full flex items-center font-medium transition-colors"
                >
                  {isNotificationsOn ? (
                    <>
                      <Bell size={16} className="mr-2" />
                      Notifications On
                    </>
                  ) : (
                    <>
                      <BellOff size={16} className="mr-2" />
                      Notifications Off
                    </>
                  )}
                </button>
              )}
              
              <Link
                to={`/profile/${creator.id}`}
                className="bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full font-medium transition-colors"
              >
                View Channel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedCreator;