import React, { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';
import { Moon, Sun, Monitor, Bell, Shield, Key } from 'lucide-react';

const Settings_Page = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="pb-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your account preferences and application settings.</p>
          </div>

          <div className="mt-8 space-y-10">
            {/* Appearance Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Monitor className="w-5 h-5 text-blue-500" />
                Appearance
              </h2>
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Theme Preference</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Choose how Cube Collab looks to you. Select a single theme, or sync with your system.
                    </p>
                  </div>
                  <div className="flex bg-gray-100 dark:bg-gray-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'light' 
                          ? 'bg-white text-gray-900 shadow-sm border border-gray-200 dark:border-gray-700' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-white shadow-sm border border-gray-700' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Information Overview */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-emerald-500" />
                Account Details
              </h2>
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                    {user?.profileImage || user?.profilePic || user?.avatar ? (
                      <img src={user.profileImage || user.profilePic || user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-blue-600 dark:text-gray-400">{user?.name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user?.name || 'Your Name'}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email || 'email@example.com'}</p>
                    <div className="mt-3 flex gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                        {user?.isVerified ? 'Verified Account' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings_Page;
