import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
          C
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
          Cube Collab
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <a
          onClick={() => navigate('/features')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          Features
        </a>
        <a
          onClick={() => navigate('/pricing')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          Pricing
        </a>
        <a
          onClick={() => navigate('/security')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          Security
        </a>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium px-4 py-2 transition-colors cursor-pointer"
        >
          Log in
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
