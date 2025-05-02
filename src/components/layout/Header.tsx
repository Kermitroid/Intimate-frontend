import React, { useState } from 'react';
import { Search, Menu, Bell, Upload, User, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../../types';
import SearchBar from '../ui/SearchBar';
import Logo from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import i18n from '../../i18n';
import LoginForm from '../auth/LoginForm';
import LanguageSelector from '../i18n/LanguageSelector';

interface HeaderProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div className={`transition-all duration-300 ${searchExpanded ? 'w-0 opacity-0' : 'w-auto opacity-100'} lg:w-auto lg:opacity-100`}>
            <Logo />
          </div>
        </div>

        <div className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 ${searchExpanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} lg:scale-100 lg:opacity-100 transition-all duration-300`}>
          <SearchBar onFocus={() => setSearchExpanded(true)} onBlur={() => setSearchExpanded(false)} />
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {!searchExpanded && (
            <button 
              onClick={() => setSearchExpanded(true)} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            >
              <Search size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}

          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Upload size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          <button className="ml-2 flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-2 px-4">
        <div className="text-sm text-gray-600 mr-4">User: {user} | Lang: {i18n.language}</div>
        <LoginForm />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;