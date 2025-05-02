import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home, Compass, Clock, ThumbsUp, Flame, Bookmark,
  ChevronDown, ChevronRight, Gamepad2, Music, Film,
  BookOpen, Coffee, Settings
} from 'lucide-react';
import { cn } from '../../utils/helpers';

// Simulated user (replace with useAuth() if available)

const Sidebar: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Subscriptions': true,
    'Explore': false,
  });

  
  };

  
  
  return (
    <aside role="complementary" className="hidden md:block w-16 lg:w-60 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-4 border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="px-3">
        <div className="mb-6">
          <nav role="navigation" className="space-y-1">
            <NavLink to="/" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <Home size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">Home</span>
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <Compass size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">Explore</span>
            </NavLink>
            <NavLink to="/trending" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <Flame size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">Trending</span>
            </NavLink>
            <Link to="/dashboard" className="block">Dashboard</Link>
            <Link to={`/creator/${user?.id || 'guest'}`} className="block">My Creator Profile</Link>
          </nav>
        </div>

        <div className="mb-6">
          <nav role="navigation" className="space-y-1">
            <NavLink to="/history" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <Clock size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">History</span>
            </NavLink>
            <NavLink to="/liked" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <ThumbsUp size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">Liked</span>
            </NavLink>
            <NavLink to="/saved" className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
              <Bookmark size={20} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <span className="hidden lg:block ml-3">Saved</span>
            </NavLink>
          </nav>
        </div>

        <div className="mb-6">
          <div className="hidden lg:flex items-center justify-between px-4 mb-2">
            <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">Subscriptions</p>
            <button onClick={() => toggleCategory('Subscriptions')} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              {expandedCategories['Subscriptions'] ? (
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronRight size={16} className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          {expandedCategories['Subscriptions'] && (
            <div className="space-y-1">
              <NavLink to={`/profile/${user?.id || 'guest'}`} className={({ isActive }) => cn(navLinkClasses, isActive ? activeClasses : '', "md:justify-center lg:justify-start")}>
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = "/default-avatar.png"}
                  />
                </div>
                <span className="hidden lg:block ml-3 truncate">{user.displayName || "Guest"}</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;